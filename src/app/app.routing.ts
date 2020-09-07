import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { UserRegistrationComponent } from './pages/all-registration/user-registration/user-registration.component';
import { FacilityRegistrationComponent } from './pages/all-registration/facility-registration/facility-registration.component';
import { LawyerRegistrationComponent } from './pages/all-registration/lawyer-registration/lawyer-registration.component';
import { ParalegalRegistrationComponent } from './pages/all-registration/paralegal-registration/paralegal-registration.component';
import { BondsmanRegistrationComponent } from './pages/all-registration/bondsman-registration/bondsman-registration.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LoginComponent } from './pages/all-login/login/login.component';
import { UserLoginComponent } from './pages/all-login/user-login/user-login.component';
import { AccountReviewComponent } from './pages/account-review/account-review.component';
import { PublicDefenderRegistrationComponent } from './pages/all-registration/public-defender-registration/public-defender-registration.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [{
      path: '', loadChildren: './layouts/layout.module#LayoutModule'
    }]
  },
  { path: 'login', component: LoginComponent },
  { path: ':facilityCode/login', component: UserLoginComponent },
  // { path: 'register', component: RegistrationComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'lawyer/registration', component: LawyerRegistrationComponent },
  { path: ':orgCode/lawyer/registration/:token', component: LawyerRegistrationComponent },
  { path: 'account-review', component: AccountReviewComponent },
  // { path: 'facility/registration', component: FacilityRegistrationComponent },
  { path: 'paralegal/registration', component: ParalegalRegistrationComponent },
  { path: 'defender/registration', component: PublicDefenderRegistrationComponent },
  { path: 'bondsman/registration', component: BondsmanRegistrationComponent },
  { path: ':facilityCode/registration', component: UserRegistrationComponent },
  { path: ':facilityCode/facility/registration', component: FacilityRegistrationComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'dashboard' }
]