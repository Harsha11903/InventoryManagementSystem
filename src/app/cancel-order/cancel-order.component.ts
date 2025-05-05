import { Component } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../services/auth.service'; // Adjust the import path as needed

@Component({
  standalone: false,
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent {
  cancelOrderId: string = '';
  cancellationReason: string = '';
  cancellationMessage: string = '';
  errorMessage: string = ''; // Define errorMessage here

  constructor(private authService: AuthService) {}

  async cancelOrder() {
    if (!this.cancelOrderId || !this.cancellationReason) {
      this.errorMessage = 'Please provide both Order ID and a cancellation reason.';
      this.cancellationMessage = '';
      return;
    }

    try {
      const token = this.authService.getToken();

      // Step 1: Fetch the order details by ID
      const orderResponse = await axios.get(`http://localhost:1818/orders/getById/${this.cancelOrderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const orderDetails = orderResponse.data;

      // Step 2: Check if the order status is "pending"
      if (orderDetails.status !== 'pending') {
        this.errorMessage = `Order cannot be cancelled as it is already ${orderDetails.status}.`;
        this.cancellationMessage = '';
        return;
      }

      // Step 3: Proceed with cancellation if the status is "pending"
      const cancelResponse = await axios.delete(`http://localhost:1818/orders/customer/deleteByOrderId/${this.cancelOrderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.cancellationMessage = cancelResponse.data; // Success message from the backend
      this.errorMessage = '';
      this.cancelOrderId = ''; // Clear the form
      this.cancellationReason = '';
    } catch (error) {
      console.error('Error cancelling the order:', error);
      this.errorMessage = 'Failed to cancel the order. Please try again.';
      this.cancellationMessage = '';
    }
  }
}
