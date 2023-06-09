import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerRoutingModule } from './lawyer-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LawyerdashboardComponent } from './lawyerdashboard/lawyerdashboard.component';
import { ViewCaseDetailsComponent } from './view-case-details/view-case-details.component';
import { AcceptedCasesComponent } from './accepted-cases/accepted-cases.component';
import { LawyerChatComponent } from './lawyer-chat/lawyer-chat.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ReversePipe } from './accepted-cases/reverse.pipe';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InquiriesCaseViewComponent } from './inquiries-case-view/inquiries-case-view.component';
import { BillingSettingsComponent } from './billing-settings/billing-settings.component';
import { UpdateBillingSettingsComponent } from './billing-settings/update-billing-settings/update-billing-settings.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { HistoryCaseComponent } from './history-case/history-case.component';

@NgModule({
  declarations: [
    LawyerdashboardComponent,
    ViewCaseDetailsComponent,
    AcceptedCasesComponent,
    LawyerChatComponent,
    ManageProfileComponent,
    ReversePipe,
    InquiriesComponent,
    InquiriesCaseViewComponent,
    BillingSettingsComponent,
    UpdateBillingSettingsComponent,
    AllTransactionsComponent,
    HistoryCaseComponent
  ],
  imports: [
    TextMaskModule,
    CommonModule,
    LawyerRoutingModule,
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

export class LawyerModule { }