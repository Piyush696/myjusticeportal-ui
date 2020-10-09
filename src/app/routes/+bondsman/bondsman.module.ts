import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BondsmanRoutingModule } from './bondsman-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BondsmanDashboardComponent } from './bondsman-dashboard/bondsman-dashboard.component';
import { AcceptedUsersComponent } from './accepted-users/accepted-users.component';
import { ViewUserComponent } from './view-user/view-user.component';

@NgModule({
  declarations: [
    BondsmanDashboardComponent,
    AcceptedUsersComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    BondsmanRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class BondsmanModule { }