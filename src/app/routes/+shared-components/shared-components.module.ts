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

@NgModule({
  declarations: [
    LoginComponent,
    MyAccountComponent,
    ManageOrganisationComponent,
    ViewUsersComponent,
    ViewFacilitiesComponent,
    SecurityQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    MyAccountComponent,
    ManageOrganisationComponent,
    ViewUsersComponent,
    ViewFacilitiesComponent,
    SecurityQuestionComponent
  ]
})

export class SharedComponentsModule { }