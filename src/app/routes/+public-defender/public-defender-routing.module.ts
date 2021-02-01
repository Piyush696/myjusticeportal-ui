import { InmatesCasesComponent } from './inmates-cases/inmates-cases/inmates-cases.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefenderDashboardComponent } from './defender-dashboard/defender-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { ManageOrganisationComponent } from '../+shared-components/+manage-organization/manage-organisation/manage-organisation.component';
import { ViewFacilitiesComponent } from '../+shared-components/+manage-organization/view-facilities/view-facilities.component';
import { ViewUsersComponent } from '../+shared-components/+manage-organization/view-users/view-users.component';
import { SearchInmatesComponent } from './search-inmates/search-inmates.component';
import { ManageProfileComponent } from '../+shared-components/manage-profile/manage-profile.component';
import { ManageBillingSettingsComponent } from '../+shared-components/manage-billing-settings/manage-billing-settings.component';
import { InmateCaseViewComponent } from './inmate-case-view/inmate-case-view.component';
import { ViewCasesComponent } from './search-inmates/view-cases/view-cases.component';
import { PdChatComponent } from './pd-chat/pd-chat.component';
import { PdTransactionsComponent } from './pd-transactions/pd-transactions.component';


const routes: Routes = [
    { path: '', redirectTo: 'defender-dashboard', pathMatch: 'full' },
    { path: 'defender-dashboard', component: DefenderDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'manage-profile', component: ManageProfileComponent },
    { path: 'manage-organization', component: ManageOrganisationComponent },
    { path: 'search-inmates', component: SearchInmatesComponent },
    { path: 'search-inmates/:userId', component: ViewCasesComponent },
    { path: 'inmates-cases', component: InmatesCasesComponent },
    { path: 'inmates-cases/:caseId', component: InmateCaseViewComponent },
    { path: 'chat', component: PdChatComponent },
    { path: 'billing-setting', component: ManageBillingSettingsComponent },
    { path: 'billing-setting/all-transactions', component: PdTransactionsComponent },
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