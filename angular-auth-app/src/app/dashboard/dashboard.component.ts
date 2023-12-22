
import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { count } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productCount: number | null=null;
  categoryCount: number | null=null;
  localUser = localStorage.getItem('user');
  userObject = this.localUser ? JSON.parse(this.localUser) : null;
  localUsername = this.userObject ? this.userObject.username : '';
  constructor(private bs: BillingService, private router: Router){}
  
  
  ngOnInit(): void {
    this.getProductCount();
    this.getCategoryCount();
  }

  getProductCount(): void {
    this.bs.getProductCount()
      .subscribe(count => this.productCount = count);
  }

  getCategoryCount(): void{
    this.bs.getCategoryCount().subscribe(
      count => this.categoryCount = count
    );
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
