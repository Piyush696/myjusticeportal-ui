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

@NgModule({
  declarations: [
    LawyerdashboardComponent,
    ViewCaseDetailsComponent,
    AcceptedCasesComponent,
    LawyerChatComponent,
    ManageProfileComponent,
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
  ]
})

export class LawyerModule { }