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
      switch (quantity) {
        case 10:
          console.log('Quantity 10 selected');
          this.taxOptions = [{ value: 5, label: 5 }];
          this.selectedTax = 5;
          break;
        case 20:
          console.log('Quantity 20 selected');
          this.taxOptions = [{ value: 8, label: 8 }];
          this.selectedTax = 8;
          break;
        case 30:
          console.log('Quantity 30 selected');
          this.taxOptions = [{ value: 10, label: 10 }];
          this.selectedTax = 10;
          break;
        default:
          console.log('No options found');
          this.taxOptions = [];
          this.selectedTax = null;
      }
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
