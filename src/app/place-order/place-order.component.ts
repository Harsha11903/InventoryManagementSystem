import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  standalone: false, // Indicates that this component is standalone
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  products: any[] = []; // To store the list of products
  customerId: number = 1; // Default customer ID
  orderStatusMessage: string = ''; // To store order success or error messages

  constructor(private authService: AuthService) {} // Inject AuthService

  ngOnInit() {
    this.fetchProducts(); // Fetch products on component initialization
  }

  async fetchProducts() {
    try {
      const token = this.authService.getToken(); // Get the token from AuthService
      const response = await axios.get('http://localhost:1818/products/getAll', {
        headers: {
          Authorization: `Bearer ${token}` // Add the bearer token to the request headers
        }
      });
      this.products = response.data.map((product: any) => ({
        productId: product.productId, // Capture productId
        name: product.name,
        desc: product.desc,
        price: product.price,
        stockLevel: product.stockLevel,
        quantity: 1 // Initialize quantity for each product
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  increaseQty(product: any) {
    product.quantity++;
  }

  decreaseQty(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  async orderProduct(product: any) {
    const userId = localStorage.getItem('userId');
    this.customerId = userId ? +userId : 0; // Default to 0 if userId is null
    const order = {
      customer: {
        id: this.customerId
      },
      product: {
        productId: product.productId, // Include productId in the order payload
        name: product.name,
        price: product.price
      },
      quantity: product.quantity,
      orderDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      status: 'pending'
    };

    try {
      const token = this.authService.getToken(); // Get the token from AuthService
    
      const response = await axios.post('http://localhost:1818/orders/customer/create', order, {
        headers: {
          Authorization: `Bearer ${token}` // Add the bearer token to the request headers
        }
      });
      console.log(response.data);
      this.orderStatusMessage = `Order placed successfully for ${product.name} with order id :${response.data.orderId}!`; // Success message
    } catch (error) {
      console.error('Error placing order:', error);
      this.orderStatusMessage = `Failed to place order for ${product.name}. Please try again.`; // Error message
    }
  }
}
