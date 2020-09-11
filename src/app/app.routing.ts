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
import { InvitedLawyerComponent } from './pages/all-registration/invited-lawyer/invited-lawyer.component';
import { InvitedParalegalComponent } from './pages/all-registration/invited-paralegal/invited-paralegal.component';
import { InvitedPublicDefenderComponent } from './pages/all-registration/invited-public-defender/invited-public-defender.component';
import { InvitedBondsmanComponent } from './pages/all-registration/invited-bondsman/invited-bondsman.component';
import { AuthGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [
  {
    path: 'mjp', component: LayoutComponent,
    children: [{
      path: '', loadChildren: './layouts/layout.module#LayoutModule'
    }]
  },
  { path: 'login', component: LoginComponent },
  { path: ':facilityCode/login', component: UserLoginComponent },
  // { path: 'register', component: RegistrationComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'lawyer/registration', component: LawyerRegistrationComponent },
  { path: 'account-review', component: AccountReviewComponent },
  // { path: 'facility/registration', component: FacilityRegistrationComponent },
  { path: 'paralegal/registration', component: ParalegalRegistrationComponent },
  { path: 'defender/registration', component: PublicDefenderRegistrationComponent },
  { path: 'bondsman/registration', component: BondsmanRegistrationComponent },
  { path: 'lawyer/registration/:token', component: InvitedLawyerComponent },
  { path: 'paralegal/registration/:token', component: InvitedParalegalComponent },
  { path: 'public-defender/registration/:token', component: InvitedPublicDefenderComponent },
  { path: 'bondsman/registration/:token', component: InvitedBondsmanComponent },
  { path: ':facilityCode/registration', component: UserRegistrationComponent },
  { path: ':facilityCode/facility/registration', component: FacilityRegistrationComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  // { path: '**', redirectTo: 'dashboard' }
  { path: '**', redirectTo: 'login' }
]