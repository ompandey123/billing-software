import { Component, OnInit } from '@angular/core';
import Product from '../models/product';
import Category from '../models/category';
import Company from '../models/company';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';
import User from '../models/register';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  companies: Company[] = [];
  users: User[] = [];
  selectedCompany: number | null = null;
  selectedCategory: number | null = null;
  selectedUser: number | null = null;
  
  constructor(private router: Router, private bs: BillingService){}
  
  ngOnInit() {
    this.displayProduct();
    this.fetchCompanies();
    this.fetchUsers();
  }

  displayProduct()
  {
    this.bs.getAllProducts().subscribe(
      data=>{
        this.products = data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this Product?')) {
      this.bs.deleteProduct(productId).subscribe(
        () => {
          // Refresh the user list after deletion
          this.displayProduct();
        },
        error => {
          console.error('Error deleting Product:', error);
          // Handle error gracefully, e.g., show an error message
        }
      );
    }
  }


  fetchCategories(){
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

  fetchCompanies(){
    this.bs.getAllComp().subscribe(
      data=>{
        this.companies = data;
      },
      error=>{
        console.log(error);
      }
    )
  }

  fetchUsers(){
    this.bs.getUsers().subscribe(
      data=>{
        this.users = data
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  onCompanyChange() {
    // Fetch categories based on the selected company
    if (this.selectedCompany) {
      this.bs.companyCategory(this.selectedCompany).subscribe(
        data => {
          this.categories = data;
        },
        error => console.log(error)
      );
    }
  }


  companyId:number|null=null;
    categoryId:number|null=null;
    userId: number|null=null;
    productName: String="";
    productBrand: String="";
    productMeasurement: String="";
    productPriceOn: number|null=null;
    productPackaging: String = "";
    productQuantity: String="";
    categoryName:String="";

    addProduct(){
      const newProduct: Product = {
        companyId: this.selectedCompany,
        categoryId: this.selectedCategory,
        userId: this.selectedUser,
        productName: this.productName,
        productBrand: this.productBrand,
        productMeasurement: this.productMeasurement,
        productPriceOn: this.productPriceOn,
        productPackaging: this.productPackaging,
        productQuantity: this.productQuantity, 
      };

      this.bs.addProduct(newProduct).subscribe(
        data=>{
          this.displayProduct();
          console.log("Product Added", data);
        },
        error=>{
          console.log("Error Adding product", error)
        }
      )
    }

    getAllUsernames() {
      this.bs.getUsernames().subscribe(
        (data) => {
          this.users = data; // Assuming users property is intended to store the usernames
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
}
