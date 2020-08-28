import { Routes } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { AppSettingsComponent } from 'app/pages/app-settings/app-settings.component';
import { CasesComponent } from 'app/pages/cases/cases.component';
import { CreateCaseComponent } from 'app/pages/create-case/create-case.component';
import { EditCaseComponent } from 'app/pages/edit-case/edit-case.component';
import { MyAccountComponent } from 'app/pages/my-account/my-account.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { ViewCaseComponent } from 'app/pages/view-case/view-case.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { IconsComponent } from '../pages/icons/icons.component';
import { MapsComponent } from '../pages/maps/maps.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { TableComponent } from '../pages/table/table.component';
import { TypographyComponent } from '../pages/typography/typography.component';
import { ViewCaseFilesComponent } from 'app/pages/view-case-files/view-case-files.component';
import { UserDetailsComponent } from 'app/pages/user-details/user-details.component';

export const LayoutRoutes: Routes = [
    { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
    { path: 'user-details', canActivate: [AuthGuard], component: UserDetailsComponent },
    { path: 'table', canActivate: [AuthGuard], component: TableComponent },
    { path: 'typography', canActivate: [AuthGuard], component: TypographyComponent },
    { path: 'icons', canActivate: [AuthGuard], component: IconsComponent },
    { path: 'maps', canActivate: [AuthGuard], component: MapsComponent },
    { path: 'notifications', canActivate: [AuthGuard], component: NotificationsComponent },
    { path: 'my-account', canActivate: [AuthGuard], component: MyAccountComponent },
    { path: 'case', canActivate: [AuthGuard], component: CasesComponent },
    { path: 'case/create', canActivate: [AuthGuard], component: CreateCaseComponent },
    { path: 'case/:caseId/edit', canActivate: [AuthGuard], component: EditCaseComponent },
    { path: 'case/:caseId', canActivate: [AuthGuard], component: ViewCaseComponent },
    { path: 'case/:caseId/files', canActivate: [AuthGuard], component: ViewCaseFilesComponent },
    { path: 'app-setting', canActivate: [AuthGuard], component: AppSettingsComponent },
];