import { Routes } from '@angular/router';
import { AuthGuard } from '~core/guards/auth.guard';
import { HomeComponent } from '~features/home/home.component';
import { LoginComponent } from '~features/authentication/pages/login/login.component';
import { SalesOrderComponent } from '~features/sales-order/pages/sales-order/sales-order.component';
import { ContactComponent } from '~features/contact/pages/contact/contact.component';
import { UserComponent } from '~features/user/pages/user/user.component';
import { DashboardComponent } from '~features/dashboard/pages/dashboard/dashboard.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard], // require for load sign-in page first
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'sales-order', component: SalesOrderComponent },
      { path: 'user', component: UserComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
