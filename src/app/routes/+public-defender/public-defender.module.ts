import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicDefenderRoutingModule } from './public-defender-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefenderDashboardComponent } from './defender-dashboard/defender-dashboard.component';

@NgModule({
  declarations: [
    DefenderDashboardComponent
  ],
  imports: [
    CommonModule,
    PublicDefenderRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class PublicDefenderModule { }