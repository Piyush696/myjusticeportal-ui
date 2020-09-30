import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ManageOrganisationComponent } from './+manage-organization/manage-organisation/manage-organisation.component';
import { ViewUsersComponent } from './+manage-organization/view-users/view-users.component';
import { ViewFacilitiesComponent } from './+manage-organization/view-facilities/view-facilities.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    LoginComponent,
    MyAccountComponent,
    ManageOrganisationComponent,
    ViewUsersComponent,
    ViewFacilitiesComponent,
    SecurityQuestionComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule,
    FileUploadModule
  ],
  exports: [
    LoginComponent,
    MyAccountComponent,
    ManageOrganisationComponent,
    ViewUsersComponent,
    ViewFacilitiesComponent,
    SecurityQuestionComponent,
    ChatComponent
  ]
})

export class SharedComponentsModule { }