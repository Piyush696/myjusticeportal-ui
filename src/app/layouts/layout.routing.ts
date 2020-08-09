import { Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UserComponent } from '../pages/user/user.component';
import { TableComponent } from '../pages/table/table.component';
import { TypographyComponent } from '../pages/typography/typography.component';
import { IconsComponent } from '../pages/icons/icons.component';
import { MapsComponent } from '../pages/maps/maps.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { UsersComponent } from 'app/pages/users/users.component';
import { MyAccountComponent } from 'app/pages/my-account/my-account.component';
import { CasesComponent } from 'app/pages/cases/cases.component';
import { ViewCaseComponent } from 'app/pages/view-case/view-case.component';
import { CaseFormComponent } from 'app/pages/case-form/case-form.component';
import { CreateCaseComponent } from 'app/pages/create-case/create-case.component';
import { EditCaseComponent } from 'app/pages/edit-case/edit-case.component';

export const LayoutRoutes: Routes = [
    { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'user', canActivate: [AuthGuard], component: UserComponent },
    { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
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
];
