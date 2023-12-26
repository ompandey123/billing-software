import { Component, OnInit } from '@angular/core';
import Product from '../models/product';
import { Route, Router } from '@angular/router';
import { BillingService } from '../billing.service';
import Bill from '../models/billing';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: number | null = null;
  selectedQuantity: number | null = null;
  selectedTax: number | null = null;
  taxOptions: {value: number, label: number}[] = [];
  localUser = localStorage.getItem('user');
  userObject = this.localUser ? JSON.parse(this.localUser) : null;
  localUsername = this.userObject ? this.userObject.username : '';

  constructor(private router: Router, private bs: BillingService){}
  
  ngOnInit() {
    this.fetchProducts();
    // this.updateTaxOptions(this.selectedQuantity);
    console.log('Stored Username:', this.localUsername);
  }

  fetchProducts(){
    this.bs.getAllProducts().subscribe(
      data=>{
        this.products = data;
      },
      error=>{
        console.log("Error while getting the list of products", error);
      }
    )
  }

  updateTaxOptions() {
    console.log('Selected Quantity Type:', typeof this.selectedQuantity);
    console.log('Selected Quantity:', this.selectedQuantity);
  
    // Convert string to number
    const quantity = Number(this.selectedQuantity);
  
    console.log('Parsed Quantity Type:', typeof quantity);
    console.log('Parsed Quantity:', quantity);
  
    if (!isNaN(quantity)) {
      let taxRate = 0;
  
      if (quantity >= 1 && quantity <= 20) {
        taxRate = 5;
      } else if (quantity >= 21 && quantity <= 50) {
        taxRate = 8;
      } else if (quantity >= 51 && quantity <= 70) {
        taxRate = 10;
      } else if (quantity >= 71 && quantity <= 100) {
        taxRate = 15;
      } else {
        console.log('No options found');
        this.taxOptions = [];
        this.selectedTax = null;
        return;
      }
  
      console.log(`Quantity ${quantity} selected with ${taxRate}% tax rate`);
      this.taxOptions = [{ value: taxRate, label: taxRate }];
      this.selectedTax = taxRate;
    } else {
      console.log('Invalid quantity');
      this.taxOptions = [];
      this.selectedTax = null;
    }
  }
  


  productId: number | null = null;
  username: String = "";
  totalCost: number | null = null;
  tax: number | null = null;
  quantity: number | null = null;
  grandTotal : number | null = null;


  add(){
    const newBill: Bill = {
      productId: this.selectedProduct,
      username: this.localUsername,
      quantity: this.selectedQuantity,
      tax: this.selectedTax
    }
    console.log(newBill);
    this.bs.generateBill(newBill).subscribe(
      (result)=>{
        console.log("User Registered",result);
      },
      (error)=>{
        console.log("Not Done", error);
        console.log(this.username);
      }
    )
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
