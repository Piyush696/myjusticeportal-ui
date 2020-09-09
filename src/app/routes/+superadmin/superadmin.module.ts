import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { UsersComponent } from 'app/pages/all-users/users/users.component';
import { UserDetailsComponent } from 'app/pages/all-users/user-details/user-details.component';
import { AppSettingsComponent } from 'app/pages/app-settings/app-settings.component';
import { FacilityComponent } from 'app/pages/facility/facility.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    AppSettingsComponent,
    FacilityComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    SharedMaterialModule
  ]
})

export class SuperadminModule { }