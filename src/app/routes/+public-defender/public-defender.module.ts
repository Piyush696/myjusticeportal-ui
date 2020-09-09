import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicDefenderRoutingModule } from './public-defender-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PublicDefenderRoutingModule,
    SharedMaterialModule
  ]
})

export class PublicDefenderModule { }