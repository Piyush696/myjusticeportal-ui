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
import { StripeComponent } from './stripe/stripe.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LawyerdashboardComponent,
    ViewCaseDetailsComponent,
    AcceptedCasesComponent,
    LawyerChatComponent,
    ManageProfileComponent,
    ReversePipe,
    InquiriesComponent,
    StripeComponent,
  ],
  imports: [
    TextMaskModule,
    CommonModule,
    LawyerRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
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