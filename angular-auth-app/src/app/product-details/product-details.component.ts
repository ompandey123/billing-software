import { Component, OnInit } from '@angular/core';
import Product from '../models/product';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BillingService } from '../billing.service';
import Category from '../models/category';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  products: Product[] = [];

  constructor(private router: Router, private bs: BillingService, private route: ActivatedRoute){}

  productId: number | null = null;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.getProduct(this.productId);
    });
  }

  getProduct(id: number){
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.bs.getProductById(id).subscribe(
        data => {
          console.log(data);

          this.bs.getCategoryName(data['categoryId'] ?? 0).subscribe(
            (category: Category) => {
              if (this.products.length > 0) {
                this.products[0].categoryName = category.categoryName || "";
              }
            },
            error => {
              console.error('Error fetching user:', error);
            }
          );
          this.products = [data];
        },
        error => {
          console.error('Error fetching restaurant:', error);
        }
      );
      });
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
