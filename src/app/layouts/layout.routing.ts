import { Routes } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
// import { AppSettingsComponent } from 'app/pages/app-settings/app-settings.component';
// import { MyAccountComponent } from 'app/pages/my-account/my-account.component';
// import { FacilityComponent } from 'app/pages/facility/facility.component';
// import { UsersComponent } from 'app/pages/all-users/users/users.component';
// import { UserDetailsComponent } from 'app/pages/all-users/user-details/user-details.component';
// import { CasesComponent } from 'app/pages/case/cases/cases.component';
// import { CreateCaseComponent } from 'app/pages/case/create-case/create-case.component';
// import { EditCaseComponent } from 'app/pages/case/edit-case/edit-case.component';
// import { ViewCaseComponent } from 'app/pages/case/view-case/view-case.component';
// import { ViewCaseFilesComponent } from 'app/pages/case/view-case-files/view-case-files.component';
// import { ManageOrganisationComponent } from 'app/pages/manage-organisation/manage-organisation.component';
// import { ViewUsersComponent } from 'app/pages/view-users/view-users.component';
// import { ViewFacilitiesComponent } from 'app/pages/view-facilities/view-facilities.component';
// import { FacilityDashboardComponent } from 'app/pages/all-dashboards/facility-dashboard/facility-dashboard.component';
// import { BondsmanDashboardComponent } from 'app/pages/all-dashboards/bondsman-dashboard/bondsman-dashboard.component';
// import { ParalegalDashboardComponent } from 'app/pages/all-dashboards/paralegal-dashboard/paralegal-dashboard.component';
// import { DefenderDashboardComponent } from 'app/pages/all-dashboards/defender-dashboard/defender-dashboard.component';
// import { LawyerdashboardComponent } from 'app/pages/all-dashboards/lawyerdashboard/lawyerdashboard.component';
// import { UserDashboardComponent } from 'app/pages/all-dashboards/user-dashboard/user-dashboard.component';
// import { SuperadminDashboardComponent } from 'app/pages/all-registration/superadmin-dashboard/superadmin-dashboard.component';

export const LayoutRoutes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', loadChildren: '../routes/+user/user.module#UserModule' },
    { path: 'facility', loadChildren: '../routes/+facility/facility.module#FacilityModule' },
    { path: 'lawyer', loadChildren: '../routes/+lawyer/lawyer.module#LawyerModule' },
    { path: 'researcher', loadChildren: '../routes/+researcher/researcher.module#ResearcherModule' },
    { path: 'public-defender', loadChildren: '../routes/+public-defender/public-defender.module#PublicDefenderModule' },
    { path: 'bondsman', loadChildren: '../routes/+bondsman/bondsman.module#BondsmanModule' },
    { path: 'superadmin', loadChildren: '../routes/+superadmin/superadmin.module#SuperadminModule' },
    { path: '**', redirectTo: 'user' }
    // { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    // { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
    // { path: 'users/:userId', canActivate: [AuthGuard], component: UserDetailsComponent },
    // { path: 'lawyer-dashboard', canActivate: [AuthGuard], component: LawyerdashboardComponent },
    // { path: 'facility-dashboard', canActivate: [AuthGuard], component: FacilityDashboardComponent },
    // { path: 'bondsman-dashboard', canActivate: [AuthGuard], component: BondsmanDashboardComponent },
    // { path: 'paralegal-dashboard', canActivate: [AuthGuard], component: ParalegalDashboardComponent },
    // { path: 'defender-dashboard', canActivate: [AuthGuard], component: DefenderDashboardComponent },
    // { path: 'superadmin-dashboard', canActivate: [AuthGuard], component: SuperadminDashboardComponent },
    // { path: 'my-account', canActivate: [AuthGuard], component: MyAccountComponent },
    // { path: 'manage-organization', canActivate: [AuthGuard], component: ManageOrganisationComponent },
    // { path: 'user-dashboard', canActivate: [AuthGuard], component: UserDashboardComponent },
    // { path: 'case', canActivate: [AuthGuard], component: CasesComponent },
    // { path: 'case/create', canActivate: [AuthGuard], component: CreateCaseComponent },
    // { path: 'case/:caseId/edit', canActivate: [AuthGuard], component: EditCaseComponent },
    // { path: 'case/:caseId', canActivate: [AuthGuard], component: ViewCaseComponent },
    // { path: 'case/:caseId/files', canActivate: [AuthGuard], component: ViewCaseFilesComponent },
    // { path: 'facility', canActivate: [AuthGuard], component: FacilityComponent },
    // { path: 'app-setting', canActivate: [AuthGuard], component: AppSettingsComponent },
    // { path: 'organization/users', canActivate: [AuthGuard], component: ViewUsersComponent },
    // { path: 'organization/facilities', canActivate: [AuthGuard], component: ViewFacilitiesComponent },
];