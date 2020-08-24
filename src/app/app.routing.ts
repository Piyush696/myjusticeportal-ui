import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { BondsmanRegistrationComponent } from './pages/bondsman-registration/bondsman-registration.component';
import { FacilityRegistrationComponent } from './pages/facility-registration/facility-registration.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LawyerRegistrationComponent } from './pages/lawyer-registration/lawyer-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ParalegalRegistrationComponent } from './pages/paralegal-registration/paralegal-registration.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';


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
    path: 'lawyer/registration',
    component: LawyerRegistrationComponent
  },
  {
    path: 'facility/registration',
    component: FacilityRegistrationComponent
  },
  {
    path: 'paralegal/registration',
    component: ParalegalRegistrationComponent
  },
  {
    path: 'user/registration',
    component: UserRegistrationComponent
  },
  {
    path: 'bondsman/registration',
    component: BondsmanRegistrationComponent
  },
  {
    path: 'defender/registration',
    component: BondsmanRegistrationComponent
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
