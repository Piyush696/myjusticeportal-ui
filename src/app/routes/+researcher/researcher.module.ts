import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherRoutingModule } from './researcher-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ResearcherRoutingModule,
    SharedMaterialModule
  ]
})

export class ResearcherModule { }