import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BondsmanDashboardComponent } from './bondsman-dashboard/bondsman-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { ManageOrganisationComponent } from '../+shared-components/+manage-organization/manage-organisation/manage-organisation.component';
import { ViewFacilitiesComponent } from '../+shared-components/+manage-organization/view-facilities/view-facilities.component';
import { ViewUsersComponent } from '../+shared-components/+manage-organization/view-users/view-users.component';

const routes: Routes = [
    { path: '', redirectTo: 'bondsman-dashboard', pathMatch: 'full' },
    { path: 'bondsman-dashboard', component: BondsmanDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'manage-organization', component: ManageOrganisationComponent },
    { path: 'manage-organization/users', component: ViewUsersComponent },
    { path: 'manage-organization/facilities', component: ViewFacilitiesComponent },
    { path: '**', component: BondsmanDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class BondsmanRoutingModule { }