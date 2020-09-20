import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BondsmanDashboardComponent } from './bondsman-dashboard/bondsman-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { ManageOrganisationComponent } from '../+shared-components/+manage-organization/manage-organisation/manage-organisation.component';
import { ViewUsersComponent } from '../+shared-components/+manage-organization/view-users/view-users.component';
import { FindBondsmanComponent } from './find-bondsman/find-bondsman.component';
import { ViewBondsmanComponent } from './view-bondsman/view-bondsman.component';

const routes: Routes = [
    { path: '', redirectTo: 'bondsman-dashboard', pathMatch: 'full' },
    { path: 'bondsman-dashboard', component: BondsmanDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'manage-organization', component: ManageOrganisationComponent },
    { path: 'manage-organization/users', component: ViewUsersComponent },
    { path: 'organization', component: FindBondsmanComponent },
    { path: 'organization/:organizationId', component: ViewBondsmanComponent },
    { path: '**', component: BondsmanDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class BondsmanRoutingModule { }