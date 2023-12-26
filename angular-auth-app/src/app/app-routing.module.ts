import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoryComponent } from './category/category.component';
import { ContactusComponent } from './contactus/contactus.component';
import { BillingComponent } from './billing/billing.component';
import { BillingDetailComponent } from './billing-detail/billing-detail.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageBillComponent } from './manage-bill/manage-bill.component';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {path:  'products', component:ProductComponent},
  {path: 'productDetails/:id', component: ProductDetailsComponent},
  {path: 'categories', component: CategoryComponent},
  {path:  'contact', component: ContactusComponent},
  {path:  'bill', component: BillingComponent},
  {path: 'detail', component: BillingDetailComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'manageUsers', component: ManageUsersComponent},
  {path:  'manageProducts', component: ManageProductsComponent},
  {path: 'manageCategories', component: ManageCategoryComponent},
  {path: 'manageBills', component: ManageBillComponent},
  {path: 'manageCompanies', component: ManageCompanyComponent},
  {path: 'charts', component: ChartsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// app-routing.module.ts




