import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerRoutingModule } from './lawyer-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LawyerRoutingModule,
    SharedMaterialModule
  ]
})

export class LawyerModule { }