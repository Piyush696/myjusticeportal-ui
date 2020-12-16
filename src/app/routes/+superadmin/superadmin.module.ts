import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { UsersComponent } from './all-users/users/users.component';
import { UserDetailsComponent } from './all-users/user-details/user-details.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { FacilityComponent } from './facility/facility.component';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostageAppComponent } from './app-settings/postage-app/postage-app.component';
import { TwilioCredentialsComponent } from './app-settings/twilio-credentials/twilio-credentials.component';
import { StripeConnectionComponent } from './app-settings/stripe-connection/stripe-connection.component';

@NgModule({
  declarations: [
    SuperadminDashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    AppSettingsComponent,
    PostageAppComponent,
    TwilioCredentialsComponent,
    FacilityComponent,
    StripeConnectionComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SuperadminModule { }