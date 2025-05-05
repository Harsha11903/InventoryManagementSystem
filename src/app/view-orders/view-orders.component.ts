import { Component } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../services/auth.service'; // Adjust the import path as needed

@Component({
  selector: 'app-view-orders',
  standalone: false,
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {
  showOrderDetails = true;
  showHistory = false;

  orderId: string = '';
  orderDetails: any = null;
  orderHistory: any[] = []; // To store the list of orders
  formSubmitted = false;

  // Default customer ID
  customerId: number = 0;

  constructor(private authService: AuthService) {}

  showOrderForm() {
    this.showOrderDetails = true;
    this.showHistory = false;
    this.formSubmitted = false; // Reset form submission state
    this.orderDetails = null; // Clear previous order details
  }

  showOrderHistory() {
    this.showHistory = true;
    this.showOrderDetails = false;
    this.fetchOrderHistory(); // Fetch order history when this button is clicked
  }

  async fetchOrderDetails() {
    this.formSubmitted = true; // Mark form as submitted
    if (this.orderId) {
      try {
        const token = this.authService.getToken();
        const response = await axios.get(`http://localhost:1818/orders/getById/${this.orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.orderDetails = response.data;
      } catch (error) {
        console.error('Error fetching order details:', error);
        this.orderDetails = null; // Clear previous data if an error occurs
      }
    } else {
      console.warn('Order ID is required to fetch details.');
      this.orderDetails = null;
    }
  }

  async fetchOrderHistory() {
    try {
      if (localStorage.getItem('userId')) {
        const userId = localStorage.getItem('userId');
        console.log("userId" + userId);
        if (userId !== null) {
          this.customerId = +userId;
        } else {
          console.warn('User ID not found in localStorage.');
          return;
        }
        console.log("customerId" + this.customerId);
        const token = this.authService.getToken();
        const response = await axios.get(`http://localhost:1818/orders/getByCustomerId/${this.customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("response" + response.data);
        this.orderHistory = response.data; // Store the list of orders
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
      this.orderHistory = []; // Clear previous data if an error occurs
    }
  }
}
