import { Injectable } from '@angular/core';
import Login from './models/login';
import {Observable} from 'rxjs'
import{HttpClient, HttpHeaders} from '@angular/common/http';
import User from './models/register';
import Product from './models/product';
import Category from './models/category';
import Bill from './models/billing';
import Company from './models/company';

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

private getAllUsernamesUrl  = 'https://localhost:7035/api/User/GetAllUsernames'
getUsernames(): Observable<User[]>{
  return this.http.get<User[]>(this.getAllUsernamesUrl);
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

  //Billing and All Bill related API's
  private getAllProdsUrl = 'https://localhost:7035/api/Product'
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.getAllProdsUrl}`);
  }

  private generateBillUrl = 'https://localhost:7035/api/Billing/GenerateBill'
  generateBill(bill: Bill):Observable<Bill>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<Bill>(`${this.generateBillUrl}`,JSON.stringify(bill),{headers})
  }

  private getBillByUsername = 'https://localhost:7035/api/Billing/getBillDetail/'
  getUserBills(username: string):Observable<Bill[]>{
    let userURL = `${this.getBillByUsername}${username}`;
    return this.http.get<Bill[]>(userURL);
  }

  private getBillCountUrl='https://localhost:7035/api/Billing/count'
  getBillcount(): Observable<number>{
    return this.http.get<number>(this.getBillCountUrl)
  }

  private getRevenueUrl = 'https://localhost:7035/api/Billing/totalRevenue'
  getRevenue(): Observable<number>{
    return this.http.get<number>(this.getRevenueUrl);
  }

  getTotalOfGtUrl = 'https://localhost:7035/api/Billing/totalRevenue'
  getTotalOfGt(username: string): Observable<number>{
    let totalUrl = `${this.getTotalOfGtUrl}/${username}`;
    return this.http.get<number>(totalUrl);
  }

  //Billing and All Bill related API's

  //admin and admin related services
  private addUserUrl = 'https://localhost:7035/api/User/Register'
  addNewUser(user: User):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<User>(`${this.addUserUrl}`, JSON.stringify(user), {headers});
  }

  private getAllUserUrl = 'https://localhost:7035/api/User'
  getUsers() : Observable <User [] > {
    return this.http.get<User[]>(`${this.getAllUserUrl}`);
  }

  deleteUserUrl = 'https://localhost:7035/api/User'
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteUserUrl}/${id}`);
  }

  deleteProductUrl = 'https://localhost:7035/api/Product'
  deleteProduct(id: number): Observable<void>{
    return this.http.delete<void>(`${this.deleteProductUrl}/${id}`)
  }

  private getAllCompanies = 'https://localhost:7035/api/Company/GetAllCompanies'
  getAllComp(): Observable<Company []>{
   return this.http.get<Company []>(`${this.getAllCompanies}`);
  }

  private displayCompanyCategory = 'https://localhost:7035/api/Category/getCompany'
  companyCategory(id: number) : Observable <Category [] > {
   return this.http.get<Category [] >(`${this.displayCompanyCategory}/${id}`);
  }

  private addProductsUrl = 'https://localhost:7035/api/Product/addProduct'
  addProduct(product: Product): Observable<Product>{
   const header=new HttpHeaders().set('Content-Type','Application/JSON');
   return this.http.post<Product>(`${this.addProductsUrl}`, product , {headers :header});
  }

  deleteCategoryUrl = 'https://localhost:7035/api/Category'
  deleteCategory(id: number): Observable<void>{
    return this.http.delete<void>(`${this.deleteCategoryUrl}/${id}`)
  }

  addNewCategoryUrl = 'https://localhost:7035/api/Category/addCategory'
  addNewCategory(category: Category): Observable<Category>{
    const header = new HttpHeaders({"Content-Type":"application/json"})
    return this.http.post<Category>(`${this.addNewCategoryUrl}`, category, { headers: header });
  } 

  getAllBillsUrl = 'https://localhost:7035/api/Billing/GetBills'
  getAllBills(): Observable<Bill[]>{
    return this.http.get<Bill[]>(`${this.getAllBillsUrl}`);
  }

  deleteBillUrl = 'https://localhost:7035/api/Billing'
  deleteBill(id: number): Observable<void>{
    return this.http.delete<void>(`${this.deleteBillUrl}/${id}`)
  }


  updateUserUrl = 'https://localhost:7035/api/User'
  updateUser(id: number, updatedUserData: User): Observable<User>{
    return this.http.put<User>(`${this.updateUserUrl}/${id}`, updatedUserData);
  }
  //admin and admin related services

  //company API's

  allCompanyUrl = 'https://localhost:7035/api/Company/addCompany'
  addCompany(company: Company): Observable<Company>{
    const header = new HttpHeaders({"Content-Type":"application/json"})
    return this.http.post<Company>(`${this.allCompanyUrl}`, company, { headers: header });
  }

  getCompaniesUrl = 'https://localhost:7035/api/Company/GetAllCompanies'
  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${this.getCompaniesUrl}`) 
  }

  deleteCompanyUrl = 'https://localhost:7035/api/Company'
  deleteCompany(id: number): Observable<void>{
    return this.http.delete<void>(`${this.deleteCompanyUrl}/${id}`)
  }

  

  //company API's
}

