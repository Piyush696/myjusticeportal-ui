import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { FacilityDashboardComponent } from './facility-dashboard/facility-dashboard.component';
import { FacilityUsersComponent } from './facility-users/facility-users.component';

const routes: Routes = [
    { path: '', redirectTo: 'facility-dashboard', pathMatch: 'full' },
    { path: 'facility-dashboard', component: FacilityDashboardComponent },
    { path: 'facility-users', component: FacilityUsersComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: '**', component: FacilityDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class FacilityRoutingModule { }