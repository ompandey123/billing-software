import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DribbleBallComponent } from './dribble-ball/dribble-ball.component';
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
// import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    DribbleBallComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoryComponent,
    ContactusComponent,
    BillingComponent,
    BillingDetailComponent,
    AdminPanelComponent,
    ManageUsersComponent,
    ManageProductsComponent,
    ManageCategoryComponent,
    ManageBillComponent,
    ManageCompanyComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    // MaterialModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
