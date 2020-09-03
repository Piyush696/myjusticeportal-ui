import { Routes } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { AppSettingsComponent } from 'app/pages/app-settings/app-settings.component';
import { MyAccountComponent } from 'app/pages/my-account/my-account.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { IconsComponent } from '../pages/icons/icons.component';
import { MapsComponent } from '../pages/maps/maps.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { TableComponent } from '../pages/table/table.component';
import { TypographyComponent } from '../pages/typography/typography.component';
import { FacilityComponent } from 'app/pages/facility/facility.component';
import { UserDashboardComponent } from 'app/pages/user-dashboard/user-dashboard.component';
import { LawyerdashboardComponent } from 'app/pages/lawyerdashboard/lawyerdashboard.component';
import { UsersComponent } from 'app/pages/all-users/users/users.component';
import { UserDetailsComponent } from 'app/pages/all-users/user-details/user-details.component';
import { CasesComponent } from 'app/pages/case/cases/cases.component';
import { CreateCaseComponent } from 'app/pages/case/create-case/create-case.component';
import { EditCaseComponent } from 'app/pages/case/edit-case/edit-case.component';
import { ViewCaseComponent } from 'app/pages/case/view-case/view-case.component';
import { ViewCaseFilesComponent } from 'app/pages/case/view-case-files/view-case-files.component';

export const LayoutRoutes: Routes = [
    { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
    { path: 'users/:userId', canActivate: [AuthGuard], component: UserDetailsComponent },
    { path: 'table', canActivate: [AuthGuard], component: TableComponent },
    { path: 'typography', canActivate: [AuthGuard], component: TypographyComponent },
    { path: 'lawyer-dashboard', canActivate: [AuthGuard], component: LawyerdashboardComponent },
    { path: 'icons', canActivate: [AuthGuard], component: IconsComponent },
    { path: 'maps', canActivate: [AuthGuard], component: MapsComponent },
    { path: 'notifications', canActivate: [AuthGuard], component: NotificationsComponent },
    { path: 'my-account', canActivate: [AuthGuard], component: MyAccountComponent },
    { path: 'userdashboard', component: UserDashboardComponent },
    { path: 'case', canActivate: [AuthGuard], component: CasesComponent },
    { path: 'case/create', canActivate: [AuthGuard], component: CreateCaseComponent },
    { path: 'case/:caseId/edit', canActivate: [AuthGuard], component: EditCaseComponent },
    { path: 'case/:caseId', canActivate: [AuthGuard], component: ViewCaseComponent },
    { path: 'case/:caseId/files', canActivate: [AuthGuard], component: ViewCaseFilesComponent },
    { path: 'facility', canActivate: [AuthGuard], component: FacilityComponent },
    { path: 'app-setting', canActivate: [AuthGuard], component: AppSettingsComponent },
];