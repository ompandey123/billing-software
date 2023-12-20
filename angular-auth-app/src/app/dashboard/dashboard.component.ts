
import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productCount: number | null=null;
  categoryCount: number | null=null;
  constructor(private bs: BillingService){}
  
  
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
}
