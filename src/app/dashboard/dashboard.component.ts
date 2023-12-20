
  

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showNewOrderForm = false;
  totalAmount: number = 0;
  totalRevenue: number = 0;
  newOrder: { product: string, quantity: number, pricePerQuantity: number } = { product: '', quantity: 0, pricePerQuantity: 0 };

  calculateTotal() {
    // Implement your logic to calculate total amount here
    // For now, let's assume a simple calculation (e.g., quantity * price)
    const quantity = this.newOrder.quantity;
    const pricePerQuantity = this.newOrder.pricePerQuantity;
    const taxRate = 0.1; // 10% tax rate for example
    this.totalAmount = quantity * pricePerQuantity * (1 + taxRate);
  }

  submitNewOrderForm() {
    // Implement your logic to handle the submission of the new order form
    // For now, let's log the new order details to the console
    console.log('New Order:', this.newOrder);
    this.totalRevenue += this.totalAmount;
    // You can add further logic to save the order to a service or perform other actions
  }
  navigateToProducts() {
    // Implement your logic to navigate to the Products page or perform any other action
    console.log('Navigate to Products');
  }
}
