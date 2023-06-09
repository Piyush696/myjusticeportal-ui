import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { LoginComponent } from './routes/+shared-components/login/login.component';
import { UserRegistrationComponent } from './pages/all-registration/user-registration/user-registration.component';
import { FacilityRegistrationComponent } from './pages/all-registration/facility-registration/facility-registration.component';
import { LawyerRegistrationComponent } from './pages/all-registration/lawyer-registration/lawyer-registration.component';
import { ParalegalRegistrationComponent } from './pages/all-registration/paralegal-registration/paralegal-registration.component';
import { BondsmanRegistrationComponent } from './pages/all-registration/bondsman-registration/bondsman-registration.component';
import { ForgetPasswordComponent } from './routes/+shared-components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './routes/+shared-components/reset-password/reset-password.component';
import { PublicDefenderRegistrationComponent } from './pages/all-registration/public-defender-registration/public-defender-registration.component';
import { InvitedLawyerComponent } from './pages/all-registration/invited-lawyer/invited-lawyer.component';
import { InvitedParalegalComponent } from './pages/all-registration/invited-paralegal/invited-paralegal.component';
import { InvitedPublicDefenderComponent } from './pages/all-registration/invited-public-defender/invited-public-defender.component';
import { InvitedBondsmanComponent } from './pages/all-registration/invited-bondsman/invited-bondsman.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './terms-and-conditions/privacy-policy/privacy-policy.component';
import { DisclaimersComponent } from './terms-and-conditions/disclaimers/disclaimers.component';

export const AppRoutes: Routes = [
  {
    path: 'mjp', component: LayoutComponent,
    children: [{
      path: '', loadChildren: './layouts/layout.module#LayoutModule'
    }]
  },
  { path: 'login', component: LoginComponent },
  { path: 'lawyer/registration', component: LawyerRegistrationComponent },
  { path: 'researcher/registration', component: ParalegalRegistrationComponent },
  { path: 'publicdefender/registration', component: PublicDefenderRegistrationComponent },
  { path: 'bondsman/registration', component: BondsmanRegistrationComponent },
  { path: 'lawyer/registration/:token', component: InvitedLawyerComponent },
  { path: 'paralegal/registration/:token', component: InvitedParalegalComponent },
  { path: 'public-defender/registration/:token', component: InvitedPublicDefenderComponent },
  { path: 'bondsman/registration/:token', component: InvitedBondsmanComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'facility/registration', component: FacilityRegistrationComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'disclaimers', component: DisclaimersComponent },
  { path: '**', redirectTo: 'login' }
]