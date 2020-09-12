import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherRoutingModule } from './researcher-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParalegalDashboardComponent } from './paralegal-dashboard/paralegal-dashboard.component';

@NgModule({
  declarations: [
    ParalegalDashboardComponent
  ],
  imports: [
    CommonModule,
    ResearcherRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class ResearcherModule { }