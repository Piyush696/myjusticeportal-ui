import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityRoutingModule } from './facility-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FacilityRoutingModule,
    SharedMaterialModule
  ]
})

export class FacilityModule { }