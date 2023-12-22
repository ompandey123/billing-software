import { Component, OnInit } from '@angular/core';
import Bill from '../models/billing';
import { Route, Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-manage-bill',
  templateUrl: './manage-bill.component.html',
  styleUrls: ['./manage-bill.component.css']
})
export class ManageBillComponent implements OnInit {

  bills: Bill[] = [];

  constructor(private router: Router, private bs: BillingService){}

  ngOnInit() {
    this.displayBills();
  }

  displayBills()
  {
    this.bs.getAllBills().subscribe(
      data=>{
        this.bills = data;
        console.log("Gotcha", data);
      },
      error=>{
        console.log("Not Found",error);
      }
    )
  }

  deleteBill(billId: number) {
    if (confirm('Are you sure you want to delete this Bill?')) {
      this.bs.deleteBill(billId).subscribe(
        () => {
          // Refresh the user list after deletion
          this.displayBills();
        },
        error => {
          console.error('Error deleting Product:', error);
          // Handle error gracefully, e.g., show an error message
        }
      );
    }
  }

}
