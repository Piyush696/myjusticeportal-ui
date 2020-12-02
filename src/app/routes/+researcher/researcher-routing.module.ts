import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParalegalDashboardComponent } from './paralegal-dashboard/paralegal-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { ManageOrganisationComponent } from '../+shared-components/+manage-organization/manage-organisation/manage-organisation.component';
import { ViewFacilitiesComponent } from '../+shared-components/+manage-organization/view-facilities/view-facilities.component';
import { ViewUsersComponent } from '../+shared-components/+manage-organization/view-users/view-users.component';
import { LegalResearchAssistanceComponent } from './legal-research-assistance/legal-research-assistance.component';
import { ViewLegalResearchFormComponent } from './view-legal-research-form/view-legal-research-form.component';

const routes: Routes = [
    { path: '', redirectTo: 'paralegal-dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: ParalegalDashboardComponent },
    { path: 'paralegal-dashboard', component: ParalegalDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'manage-organization', component: ManageOrganisationComponent },
    { path: 'manage-organization/users', component: ViewUsersComponent },
    { path: 'legal-research-assistance/:legalResearchId', component: ViewLegalResearchFormComponent },
    { path: 'legal-research-assistance', component: LegalResearchAssistanceComponent },
    { path: 'manage-organization/facilities', component: ViewFacilitiesComponent },
    { path: '**', component: ParalegalDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ResearcherRoutingModule { }