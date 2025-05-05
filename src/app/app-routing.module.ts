import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { StockComponent } from './stocks/stocks.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserNavbarComponent } from './user-dashboard/user-navbar.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path:'',component:LandingPageComponent}, 
  {path:'login',component:LoginRegisterComponent},
  { path: 'user', component: UserDashboardComponent },
  {path:"place-order",component:PlaceOrderComponent},
  {path:"view-orders",component:ViewOrdersComponent},
  {path:"cancel-order",component:CancelOrderComponent},
  {path:"edit-profile",component:EditProfileComponent},
  { path:'admin',component:AdminDashboardComponent},
  {path:'orders',component:OrdersComponent},
  {
    path:'stocks',component:StockComponent
  },
  {path:'reports',component:ReportsComponent},
  {
    path:'suppliers',component:SuppliersComponent
  },
{
  path:'logout',component:LoggedOutComponent
},
  {
    path:'products',component:ProductsComponent
  },
  {
    path:'report-details/:type',component:ReportDetailsComponent
  },
  {
    path:'register',component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
