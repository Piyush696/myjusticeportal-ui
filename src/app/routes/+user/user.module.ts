import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CasesComponent } from './+cases/cases/cases.component';
import { ViewCaseComponent } from './+cases/view-case/view-case.component';
import { CaseFormComponent } from './+cases/case-form/case-form.component';
import { CreateCaseComponent } from './+cases/create-case/create-case.component';
import { EditCaseComponent } from './+cases/edit-case/edit-case.component';
import { ViewCaseFilesComponent } from './+cases/view-case-files/view-case-files.component';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HireLawyerComponent } from './hire-lawyer/hire-lawyer.component';
import { ViewLawyerComponent } from './hire-lawyer/view-lawyer/view-lawyer.component';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PendingInquriesComponent } from './pending-inquries/pending-inquries.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    UserDashboardComponent,
    CasesComponent,
    ViewCaseComponent,
    CaseFormComponent,
    CreateCaseComponent,
    EditCaseComponent,
    ViewCaseFilesComponent,
    HireLawyerComponent,
    ViewLawyerComponent,
    FindBondsmanComponent,
    ViewBondsmanComponent,
    MessagingLawyerComponent,
    LegalResearchComponent,
    LegalResearchFormComponent,
    LegalResearchListComponent,
    LegalResearchFormViewComponent,
    EditLegalResearchFormComponent,
    ContactComponent,
    PendingInquriesComponent,
    LawyerProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    PdfViewerModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }, {
    provide: MAT_DIALOG_DATA,
    useValue: {} // Add any data you wish to test if it is passed/used correctly
  }]
})

export class UserModule { }