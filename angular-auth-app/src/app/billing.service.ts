import { Injectable } from '@angular/core';
import Login from './models/login';
import {Observable} from 'rxjs'
import{HttpClient, HttpHeaders} from '@angular/common/http';
import User from './models/register';
import Product from './models/product';
import Category from './models/category';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  //Login API
  private loginURL = 'https://localhost:7035/api/Login';
  login(user: Login): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<any>(this.loginURL , JSON.stringify(user), {headers : headers});
  }
  //Login API

  //Register API
  private registerUrl = 'https://localhost:7035/api/User/Register'
  register(user: User): Observable<User>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<User>(`${this.registerUrl}`, JSON.stringify(user), {headers});
  }
  //Register API

  //All Products and Product Related API's
  private displayProductUrl = 'https://localhost:7035/api/Product'
  displayProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.displayProductUrl}`);
  }

  private displayProductById = 'https://localhost:7035/api/Product';
  getProductById(id: number): Observable<Product> {
    const url = `${this.displayProductById}/${id}`;
    return this.http.get<Product>(url);
 }

 private countProduct = 'https://localhost:7035/api/Product/count'
 getProductCount(): Observable<number> {
  return this.http.get<number>(this.countProduct);
}
  //All Products and Product Related API's

  //All Category and Category Related API's
  private countCategory = 'https://localhost:7035/api/Category/count'
 getCategoryCount(): Observable<number> {
  return this.http.get<number>(this.countCategory);
}

private displayCategoryName = 'https://localhost:7035/api/Category';
 getCategoryName(id: number): Observable<Category> {
  const url = `${this.displayCategoryName}/${id}`;
  return this.http.get<Category>(url);
 }

 private getCategoryUrl = 'https://localhost:7035/api/Category/GetAllCategories'
 getAllCats():Observable<Category[]>{
  return this.http.get<Category[]>(`${this.getCategoryUrl}`);
 }
  //All Category and Category Related API's
}

