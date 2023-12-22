import { Component, OnInit } from '@angular/core';
import Category from '../models/category';
import Company from '../models/company';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  categories: Category[] = [];
  companies: Company[] = [];
  selectedCompany: number | null = null;

  constructor(private router: Router, private bs: BillingService){}

  ngOnInit() {
    this.displayCategory();
    this.fetchCompanies()
  }

  displayCategory()
  {
    this.bs.getAllCats().subscribe(
      data=>{
        this.categories = data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  deleteCategory(categoryId: number) {
    if (confirm('Are you sure you want to delete this Product?')) {
      this.bs.deleteCategory(categoryId).subscribe(
        () => {
          // Refresh the user list after deletion
          this.displayCategory();
        },
        error => {
          console.error('Error deleting Product:', error);
          // Handle error gracefully, e.g., show an error message
        }
      );
    }
  }

  fetchCompanies()
  {
    this.bs.getAllComp().subscribe(
      data=>{
        this.companies = data;
      },
      error=>{
        console.log(error);
      }
    )
  }

  companyId: number | null = null;
  categoryName: String="";
  commonName:String="";
  sgst:number | null = null;
  cgst:number | null = null;
  igst:number | null = null;
  pgst:number | null = null;
  totaltax?:number | null = null;

  addCategories()
  {
    const newCat: Category = {
      companyId: this.selectedCompany,
      categoryName: this.categoryName,
      commonName :this.commonName ,
      sgst: this.sgst,
      cgst: this.cgst,
      igst: this.igst,
      pgst: this.pgst,
    };

    this.bs.addNewCategory(newCat).subscribe(
      (result)=>{
        this.categories.push(result);
        this.companyId = null;
        this.categoryName = '';
        this.commonName = ''
        this.sgst = null;
        this.cgst = null;
        this.igst = null;
        this.pgst = null;
      },
      error=>{
        console.log("Error", error);
      }
    )
  }
}
