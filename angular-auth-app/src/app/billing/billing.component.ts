import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Product from '../models/product';
import { Route, Router } from '@angular/router';
import { BillingService } from '../billing.service';
import Bill from '../models/billing';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: number | null = null;
  selectedQuantity: number | null = null;
  selectedTax: number | null = null;
  taxOptions: {value: number, label: number}[] = [];
  bills: Bill[] = [];
  localUser = localStorage.getItem('user');
  userObject = this.localUser ? JSON.parse(this.localUser) : null;
  localUsername = this.userObject ? this.userObject.username : '';
  totalGrandTotal: number = 0;

  @ViewChild('pdfContent') pdfContent: ElementRef | undefined;


  constructor(private router: Router, private bs: BillingService){}
  
  ngOnInit() {
    this.fetchProducts();
    // this.updateTaxOptions(this.selectedQuantity);
    console.log('Stored Username:', this.localUsername);
    this.displayBill(this.localUsername);
    this.getGtTotal(this.localUsername)
  }

  

  fetchProducts(){
    this.bs.getAllProducts().subscribe(
      data=>{
        this.products = data;
      },
      error=>{
        console.log("Error while getting the list of products", error);
      }
    )
  }

  // updateTaxOptions() {
  //   console.log('Selected Quantity Type:', typeof this.selectedQuantity);
  //   console.log('Selected Quantity:', this.selectedQuantity);
  
  //   // Convert string to number
  //   const quantity = Number(this.selectedQuantity);
  
  //   console.log('Parsed Quantity Type:', typeof quantity);
  //   console.log('Parsed Quantity:', quantity);
  
  //   if (!isNaN(quantity)) {
  //     let taxRate = 0;
  
  //     if (quantity >= 1 && quantity <= 20) {
  //       taxRate = 5;
  //     } else if (quantity >= 21 && quantity <= 50) {
  //       taxRate = 8;
  //     } else if (quantity >= 51 && quantity <= 70) {
  //       taxRate = 10;
  //     } else if (quantity >= 71 && quantity <= 100) {
  //       taxRate = 15;
  //     } else {
  //       console.log('No options found');
  //       this.taxOptions = [];
  //       this.selectedTax = null;
  //       return;
  //     }
  
  //     console.log(`Quantity ${quantity} selected with ${taxRate}% tax rate`);
  //     this.taxOptions = [{ value: taxRate, label: taxRate }];
  //     this.selectedTax = taxRate;
  //   } else {
  //     console.log('Invalid quantity');
  //     this.taxOptions = [];
  //     this.selectedTax = null;
  //   }
  // }
  updateTaxOptions() {
    console.log('Selected Quantity Type:', typeof this.selectedQuantity);
    console.log('Selected Quantity:', this.selectedQuantity);
  
    // Convert string to number
    const quantity = Number(this.selectedQuantity);
  
    console.log('Parsed Quantity Type:', typeof quantity);
    console.log('Parsed Quantity:', quantity);
  
    if (!isNaN(quantity) && quantity > 0) {
      let taxRate = 0;
  
      if (quantity >= 1 && quantity <= 20) {
        taxRate = 5;
      } else if (quantity >= 21 && quantity <= 50) {
        taxRate = 8;
      } else if (quantity >= 51 && quantity <= 70) {
        taxRate = 10;
      } else if (quantity >= 71 && quantity <= 100) {
        taxRate = 15;
      } else {
        console.log('No options found');
        this.taxOptions = [];
        this.selectedTax = null;
        return;
      }
  
      console.log(`Quantity ${quantity} selected with ${taxRate}% tax rate`);
      this.taxOptions = [{ value: taxRate, label: taxRate }];
      this.selectedTax = taxRate;
    } else {
      console.log('Invalid quantity');
      this.taxOptions = [];
      this.selectedTax = null;
    }
  }
  
  


  productId: number | null = null;
  username: String = "";
  totalCost: number | null = null;
  tax: number | null = null;
  quantity: number | null = null;
  grandTotal : number | null = null;


  add(){
    const newBill: Bill = {
      productId: this.selectedProduct,
      username: this.localUsername,
      quantity: this.selectedQuantity,
      tax: this.selectedTax
    }
    console.log(newBill);
    this.bs.generateBill(newBill).subscribe(
      (result)=>{
        this.router.navigate(['/bill']);
        console.log("User Registered",result);
      },
      (error)=>{
        console.log("Not Done", error);
        console.log(this.username);
      }
    )
  }

  displayBill(username: string) {
    this.bs.getUserBills(username).subscribe(
      (data: any[]) => {
        console.log(data);
        this.bills = data;

        this.bills.forEach((bill, index) => {
          const productId = bill.productId ?? 0;

          this.bs.getProductById(productId).subscribe(
            (products: Product) => {
              // Set the product name for each bill individually
              this.bills[index].productName = products.productName || '';
            }
          );
        });
      }
    );
  }

  getGtTotal(username: string)
  {
    this.bs.getTotalOfGt(username).subscribe(
      (data)=>{
        console.log("Total Grand Total:", data);
        // Assuming the result contains a property named 'totalGrandTotal'
        this.totalGrandTotal = data
      },
      error=>{
        console.log(error);
      }
    )
  }


  // downloadPdf() {
  //   // Create a new jsPDF instance
  //   const pdf = new jsPDF();

  //   // Use jspdf-autotable to generate a table from the HTML content
  //   const content = this.pdfContent.nativeElement;

  //   // Ensure the content is wrapped in a div element
  //   const element = document.createElement('div');
  //   element.appendChild(content);

  //   // Generate table
  //   (jsPDF as any).autoTable({ html: element });

  //   // Save the PDF with a filename (e.g., 'billing.pdf')
  //   pdf.save('billing.pdf');
  // }

  downloadPdf() {
    
    if(this.pdfContent)
    {
      const pdf = new jsPDF();

    const content = this.pdfContent.nativeElement;

    html2canvas(content).then((canvas) => {
      // Convert canvas to image data URL
      const imgData = canvas.toDataURL('image/png');

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 210); // Adjust width and height as needed

      // Save the PDF with a filename (e.g., 'billing.pdf')
      pdf.save('billing.pdf');
    });
    }
  }

  

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
