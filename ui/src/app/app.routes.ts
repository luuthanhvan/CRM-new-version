import { Routes } from '@angular/router';
import { HomeComponent } from '~features/home/home.component';
import { LoginComponent } from '~features/authentication/pages/login/login.component';
import { AuthGuard } from '~core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard], // require for load sign-in page first
    // children: [
    //   { path: 'dashboard' },
    //   { path: 'contact' },
    //   { path: 'sales-order' },
    //   { path: 'user' },
    // ],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
