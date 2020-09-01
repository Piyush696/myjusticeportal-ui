import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { BondsmanRegistrationComponent } from './pages/bondsman-registration/bondsman-registration.component';
import { FacilityRegistrationComponent } from './pages/facility-registration/facility-registration.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LawyerRegistrationComponent } from './pages/lawyer-registration/lawyer-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ParalegalRegistrationComponent } from './pages/paralegal-registration/paralegal-registration.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PublicDefenderRegistrationComponent } from './pages/public-defender-registration/public-defender-registration.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [{
      path: '', loadChildren: './layouts/layout.module#LayoutModule'
    }]
  },
  { path: 'login', component: LoginComponent },
  { path: ':facilityCode/login', component: LoginComponent },
  // { path: 'register', component: RegistrationComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: ':facilityCode/registration', component: UserRegistrationComponent },
  { path: 'lawyer/registration', component: LawyerRegistrationComponent },
  // { path: 'facility/registration', component: FacilityRegistrationComponent },
  { path: ':facilityCode/facility/registration', component: FacilityRegistrationComponent },
  { path: 'paralegal/registration', component: ParalegalRegistrationComponent },
  { path: 'defender/registration', component: PublicDefenderRegistrationComponent },
  { path: 'bondsman/registration', component: BondsmanRegistrationComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'dashboard' }
]