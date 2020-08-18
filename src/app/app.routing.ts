import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
