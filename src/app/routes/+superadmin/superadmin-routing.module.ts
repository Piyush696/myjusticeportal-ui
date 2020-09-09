import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { UsersComponent } from 'app/pages/all-users/users/users.component';
import { UserDetailsComponent } from 'app/pages/all-users/user-details/user-details.component';
import { AppSettingsComponent } from 'app/pages/app-settings/app-settings.component';
import { FacilityComponent } from 'app/pages/facility/facility.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:userId', component: UserDetailsComponent },
    { path: 'app-setting', component: AppSettingsComponent },
    { path: 'facility', component: FacilityComponent },
    { path: '**', component: DashboardComponent }
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