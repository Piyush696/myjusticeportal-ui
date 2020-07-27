import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LayoutComponent } from './layouts/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/layout.module#LayoutModule'
      }]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
