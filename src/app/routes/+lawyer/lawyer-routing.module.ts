import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawyerdashboardComponent } from './lawyerdashboard/lawyerdashboard.component';
import { AcceptedCasesComponent } from './accepted-cases/accepted-cases.component';
import { ViewCaseDetailsComponent } from './view-case-details/view-case-details.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { ManageOrganisationComponent } from '../+shared-components/+manage-organization/manage-organisation/manage-organisation.component';
import { ViewUsersComponent } from '../+shared-components/+manage-organization/view-users/view-users.component';
import { ViewFacilitiesComponent } from '../+shared-components/+manage-organization/view-facilities/view-facilities.component';
import { LawyerChatComponent } from './lawyer-chat/lawyer-chat.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { InquiriesCaseViewComponent } from './inquiries-case-view/inquiries-case-view.component';
import { BillingSettingsComponent } from './billing-settings/billing-settings.component';
import { UpdateBillingSettingsComponent } from './billing-settings/update-billing-settings/update-billing-settings.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';

const routes: Routes = [
    { path: '', redirectTo: 'lawyer-dashboard', pathMatch: 'full' },
    { path: 'lawyer-dashboard', component: LawyerdashboardComponent },
    { path: 'accepted-cases', component: AcceptedCasesComponent },
    { path: 'accepted-cases/:caseId', component: ViewCaseDetailsComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'manage-organization', component: ManageOrganisationComponent },
    { path: 'manage-profile', component: ManageProfileComponent },
    { path: 'inquiries', component: InquiriesComponent },
    { path: 'billing-setting', component: BillingSettingsComponent },
    { path: 'billing-setting/all-transactions', component: AllTransactionsComponent },
    { path: 'billing-setting/update', component: UpdateBillingSettingsComponent },
    { path: 'manage-organization/users', component: ViewUsersComponent },
    { path: 'lawyer-chat', component: LawyerChatComponent },
    { path: 'lawyer-chat/:userId', component: LawyerChatComponent },
    { path: 'inquiries/:lawyer_caseId', component: InquiriesCaseViewComponent },
    { path: 'manage-organization/facilities', component: ViewFacilitiesComponent },
    { path: '**', component: LawyerdashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class LawyerRoutingModule { }