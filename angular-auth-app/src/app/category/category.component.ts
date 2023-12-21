import { Component, OnInit } from '@angular/core';
import Category from '../models/category';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private router: Router, private bs: BillingService){}

  ngOnInit(){
    this.getCategories();
  }

  getCategories(){
    this.bs.getAllCats().subscribe(
      data=>{
        this.categories = data;
        console.log("Hello", data);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
