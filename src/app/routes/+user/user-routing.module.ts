import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { CasesComponent } from './+cases/cases/cases.component';
import { CreateCaseComponent } from './+cases/create-case/create-case.component';
import { EditCaseComponent } from './+cases/edit-case/edit-case.component';
import { ViewCaseComponent } from './+cases/view-case/view-case.component';
import { ViewLawyerComponent } from './hire-lawyer/view-lawyer/view-lawyer.component';
import { HireLawyerComponent } from './hire-lawyer/hire-lawyer.component';
import { FindBondsmanComponent } from './find-bondsman/find-bondsman.component';
import { ViewBondsmanComponent } from './view-bondsman/view-bondsman.component';
import { MessagingLawyerComponent } from './messaging-lawyer/messaging-lawyer.component';
import { LegalResearchComponent } from './legal-research/legal-research.component';
import { LegalResearchFormComponent } from './legal-research/legal-research-form/legal-research-form.component';
import { LegalResearchListComponent } from './legal-research/legal-research-list/legal-research-list.component';
import { LegalResearchFormViewComponent } from './legal-research/legal-research-form-view/legal-research-form-view.component';
import { EditLegalResearchFormComponent } from './legal-research/edit-legal-research-form/edit-legal-research-form.component';
import { ContactComponent } from './contact/contact.component';
import { LawyerProfileComponent } from './hire-lawyer/lawyer-profile/lawyer-profile.component';
import { PendingInquriesComponent } from './pending-inquries/pending-inquries.component';


const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: UserDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'case', component: CasesComponent },
    { path: 'inquiries', component: PendingInquriesComponent },
    { path: 'contact/:userId', component: ContactComponent },
    { path: 'case/create', component: CreateCaseComponent },
    { path: 'case/:caseId/edit', component: EditCaseComponent },
    { path: 'case/:caseId', component: ViewCaseComponent },
    { path: 'hire-lawyer', component: HireLawyerComponent },
    { path: 'legal-research', component: LegalResearchComponent },
    { path: 'hire-lawyer/:organizationId', component: ViewLawyerComponent },
    { path: 'find-bondsman', component: FindBondsmanComponent },
    { path: 'message-my-lawyer', component: MessagingLawyerComponent },
    { path: 'lawyer-profile/:userId', component: LawyerProfileComponent },
    { path: 'find-bondsman/:organizationId', component: ViewBondsmanComponent },
    { path: 'legal-form', component: LegalResearchListComponent },
    { path: 'legal-form/create', component: LegalResearchFormComponent },
    { path: 'legal-form/:legalResearchId', component: LegalResearchFormViewComponent },
    { path: 'legal-form/:legalResearchId/edit', component: EditLegalResearchFormComponent },

    { path: '**', component: UserDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class UserRoutingModule { }