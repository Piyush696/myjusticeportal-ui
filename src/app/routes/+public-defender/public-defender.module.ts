import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { DefenderDashboardComponent } from './defender-dashboard/defender-dashboard.component';
import { PublicDefenderRoutingModule } from './public-defender-routing.module';
import { SearchInmatesComponent } from './search-inmates/search-inmates.component';


@NgModule({
  declarations: [
    DefenderDashboardComponent,
    SearchInmatesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicDefenderRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
    ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }, {
    provide: MAT_DIALOG_DATA,
    useValue: {} // Add any data you wish to test if it is passed/used correctly
  }]
})

export class PublicDefenderModule { }