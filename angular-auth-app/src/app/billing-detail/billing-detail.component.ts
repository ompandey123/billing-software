import { Component, OnInit } from '@angular/core';
import Bill from '../models/billing';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';
import Product from '../models/product';

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css']
})
export class BillingDetailComponent implements OnInit {

  bills: Bill[] = [];
  localUser = localStorage.getItem('user');
  userObject = this.localUser ? JSON.parse(this.localUser) : null;
  localUsername = this.userObject ? this.userObject.username : '';
  totalGrandTotal: number = 0;

  constructor(private route: Router, private bs: BillingService) {}

  ngOnInit() {
    console.log("Local User:", this.localUsername);
    this.displayBill(this.localUsername);
    this.getGtTotal(this.localUsername);
  }

  displayBill(username: string) {
    this.bs.getUserBills(username).subscribe(
      (data: any[]) => {
        console.log(data);
        this.bills = data;

        this.bills.forEach((bill, index) => {
          const productId = bill.productId ?? 0;

          this.bs.getProductById(productId).subscribe(
            (products: Product) => {
              // Set the product name for each bill individually
              this.bills[index].productName = products.productName || '';
            }
          );
        });
      }
    );
  }

  getGtTotal(username: string)
  {
    this.bs.getTotalOfGt(username).subscribe(
      (data)=>{
        console.log("Total Grand Total:", data);
        // Assuming the result contains a property named 'totalGrandTotal'
        this.totalGrandTotal = data
      },
      error=>{
        console.log(error);
      }
    )
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.route.navigate(['/login']);
  }
}
