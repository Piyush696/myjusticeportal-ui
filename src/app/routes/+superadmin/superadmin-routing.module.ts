import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { UsersComponent } from './all-users/users/users.component';
import { UserDetailsComponent } from './all-users/user-details/user-details.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { FacilityComponent } from './facility/facility.component';

const routes: Routes = [
    { path: '', redirectTo: 'superadmin-dashboard', pathMatch: 'full' },
    { path: 'superadmin-dashboard', component: SuperadminDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:userId', component: UserDetailsComponent },
    { path: 'app-setting', component: AppSettingsComponent },
    { path: 'facility', component: FacilityComponent },
    { path: '**', component: SuperadminDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class SuperadminRoutingModule { }