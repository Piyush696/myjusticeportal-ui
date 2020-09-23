import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityRoutingModule } from './facility-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilityDashboardComponent } from './facility-dashboard/facility-dashboard.component';

@NgModule({
  declarations: [
    FacilityDashboardComponent
  ],
  imports: [
    CommonModule,
    FacilityRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class FacilityModule { }