import { Component, OnInit } from '@angular/core';
import Product from '../models/product';
import Category from '../models/category';
import Company from '../models/company';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  companies: Company[]=[];

  constructor(private router: Router, private bs: BillingService){}

  ngOnInit(){
    this.displayProducts();
  }

  displayProducts(){
    this.bs.displayProduct().subscribe(
      data=>{
        console.log("Hello");
        this.products = data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  productDetails(id: number) {
    this.bs.getProductById(id).subscribe(
      data => {
        this.router.navigate(['productDetails', id]);
        console.log(data);
      }
    );
  }
}
