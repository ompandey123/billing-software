import { Component, OnInit } from '@angular/core';
import Company from '../models/company';
import { Router } from '@angular/router';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit{
companies: Company[] = [];

constructor(private router: Router, private bs: BillingService){}

ngOnInit() {
  this.getAllCompanies();
}

companyName: String = "";
companyAdmin: String = "";
companyAssociation: String = "" ;
companyAddress: String = "";
gstno :String="";

addCompany(){
  const newCompany: Company = {
    companyName: this.companyName,
    companyAdmin: this.companyAdmin,
    companyAssociation: this.companyAssociation,
    companyAddress: this.companyAddress,
    gstno: this.gstno
  }
  this.bs.addCompany(newCompany).subscribe(
    (result)=>{
      this.companies.push(result);
      this.companyName = '';
      this.companyAdmin = '';
      this.companyAssociation = ''
      this.companyAddress = '';
      this.gstno = '';
    },
    error=>{
      console.log("Error", error);
    }
  )
}

getAllCompanies()
{
  this.bs.getCompanies().subscribe(
    data=>{
      this.companies=data;
      console.log(data);
    },
    error=>{
      console.log(error);
    }
  )
}

deleteCompany(companyId: number) {
  if (confirm('Are you sure you want to delete this Company?')) {
    this.bs.deleteCompany(companyId).subscribe(
      () => {
        // Refresh the user list after deletion
        this.getAllCompanies();
      },
      error => {
        console.error('Error deleting Product:', error);
        // Handle error gracefully, e.g., show an error message
      }
    );
  }
}


}
