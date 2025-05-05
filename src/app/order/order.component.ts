import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;

    if (!token) {
      this.router.navigate(['/logout']); // Redirect to logout if there is no token
    } else {
      this.isAdmin = this.authService.getIsAdmin();
      this.getAllOrders();
    }
  }

  async getAllOrders() {
    try {
      const token = this.authService.getToken();
      const response = await axios.get("http://localhost:1818/orders/admin/getAll", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      this.orders = response.data;
      this.sortOrders(); // Sort orders after fetching
    } catch (error) {
      console.error('There was an error fetching the orders!', error);
    }
  }

  sortOrders() {
    this.orders.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') {
        return -1; // Move pending orders down
      } else if (a.status !== 'pending' && b.status === 'pending') {
        return 1; // Move non-pending orders up
      } else {
        return 0; // Keep the same order if both are pending or both are not pending
      }
    });
  }

  async updateOrderStatus(orderId: number, status: string) {
    try {
      const token = this.authService.getToken();
      const order = this.orders.find(order => order.id === orderId);

     
        if (status.toLowerCase() === 'delivered') {
          const response = await axios.put(`http://localhost:1818/orders/admin/updateOrderStatus?id=${orderId}&status=${status}`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          alert(response.data);
          this.getAllOrders();
        } else {
          alert('Please enter a valid status: "delivered" or "Delivered".');
        }
     
    } catch (error) {
      console.error('There was an error updating the order status!', error);
    }
  }
}
