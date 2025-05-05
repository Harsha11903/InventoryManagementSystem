import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { StockComponent } from './stocks/stocks.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { AdminNavbarComponent } from './admin-dashboard/admin-navbar.component';
import { UserNavbarComponent } from './user-dashboard/user-navbar.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    PlaceOrderComponent,
    ViewOrdersComponent,
    CancelOrderComponent,
    EditProfileComponent,
    AdminDashboardComponent,
    ReportsComponent,
    StockComponent,
    SuppliersComponent,
    OrdersComponent,
    ProductsComponent,
    ReportDetailsComponent,
    AdminNavbarComponent,
    UserNavbarComponent,
    LoginRegisterComponent,
    LoggedOutComponent,
    UserNavbarComponent,
    LandingPageComponent,
    RegisterComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
