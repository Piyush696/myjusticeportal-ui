import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerRoutingModule } from './lawyer-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LawyerdashboardComponent } from './lawyerdashboard/lawyerdashboard.component';

@NgModule({
  declarations: [
    LawyerdashboardComponent
  ],
  imports: [
    CommonModule,
    LawyerRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class LawyerModule { }