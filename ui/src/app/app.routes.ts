import { Routes } from '@angular/router';
import { HomeComponent } from '~features/home/home.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   { path: 'dashboard' },
    //   { path: 'contact' },
    //   { path: 'sales-order' },
    //   { path: 'user' },
    // ],
  },
];
