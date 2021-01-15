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
import { MesageListComponent } from './mesage-list/mesage-list.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { StripeComponent } from './stripe/stripe.component';
import { ChatModalComponent } from './chat-modal/chat-modal.component';
import { BillingServicesComponent } from './billing-services/billing-services.component';
import { PublicDefenderBillingComponent } from './public-defender-billing/public-defender-billing.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ManageBillingSettingsComponent } from './manage-billing-settings/manage-billing-settings.component';

@NgModule({
  declarations: [
    LoginComponent,
    MyAccountComponent,
    ManageOrganisationComponent,
    ViewUsersComponent,
    ViewFacilitiesComponent,
    SecurityQuestionComponent,
    ChatComponent,
    MesageListComponent,
    StripeComponent,
    BillingServicesComponent,
    ChatModalComponent,
    PublicDefenderBillingComponent,
    ManageProfileComponent,
    ManageBillingSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule,
    FileUploadModule,
    ColorPickerModule
  ],
  exports: [
    LoginComponent,
    MyAccountComponent,
    ManageOrganisationComponent,
    ViewUsersComponent,
    ViewFacilitiesComponent,
    SecurityQuestionComponent,
    ChatComponent,
    MesageListComponent,
    StripeComponent,
    BillingServicesComponent,
    ChatModalComponent,
    PublicDefenderBillingComponent,
    ManageProfileComponent,
    ManageBillingSettingsComponent
  ]
})

export class SharedComponentsModule { }