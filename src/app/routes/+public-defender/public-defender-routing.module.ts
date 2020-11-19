import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefenderDashboardComponent } from './defender-dashboard/defender-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { ManageOrganisationComponent } from '../+shared-components/+manage-organization/manage-organisation/manage-organisation.component';
import { ViewFacilitiesComponent } from '../+shared-components/+manage-organization/view-facilities/view-facilities.component';
import { ViewUsersComponent } from '../+shared-components/+manage-organization/view-users/view-users.component';
import { SearchInmatesComponent } from './search-inmates/search-inmates.component';

const routes: Routes = [
    { path: '', redirectTo: 'defender-dashboard', pathMatch: 'full' },
    { path: 'defender-dashboard', component: DefenderDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'manage-organization', component: ManageOrganisationComponent },
    { path: 'search-inquiries', component: SearchInmatesComponent },
    { path: 'manage-organization/users', component: ViewUsersComponent },
    { path: 'manage-organization/facilities', component: ViewFacilitiesComponent },
    { path: '**', component: DefenderDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class PublicDefenderRoutingModule { }