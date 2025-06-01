import { Routes } from '@angular/router';
import { AuthGuard } from '~core/guards/auth.guard';
import { HomeComponent } from '~features/home/home.component';
import { LoginComponent } from '~features/authentication/pages/login/login.component';
import { UserComponent } from '~features/user/pages/user/user.component';
// import { ContactComponent } from '~features/contact/pages/contact/contact.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard], // require for load sign-in page first
    children: [
      // { path: 'dashboard' },
      // { path: 'contact', component: ContactComponent },
      // { path: 'sales-order' },
      { path: 'user', component: UserComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
