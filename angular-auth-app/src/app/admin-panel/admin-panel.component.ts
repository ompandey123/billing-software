import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  productCount: number | null=null;
  categoryCount: number | null=null;
  billCount: number | null = null;
  revenue: number | null = null;

  constructor(private router: Router, private bs: BillingService){}

  ngOnInit(): void {
    this.getProductCount();
    this.getCategoryCount();
    this.getBillcount();
    this.getRevenue();
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

  getBillcount(): void{
    this.bs.getBillcount().subscribe(
      count => this.billCount = count
    )
  }

  getRevenue(): void{
    this.bs.getRevenue().subscribe(
      total => this.revenue = total
    )
  }

  logout()
  {
    this.router.navigate(['login']);
  }
}
