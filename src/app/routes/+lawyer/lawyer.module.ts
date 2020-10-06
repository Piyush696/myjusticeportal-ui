import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerRoutingModule } from './lawyer-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LawyerdashboardComponent } from './lawyerdashboard/lawyerdashboard.component';
import { ViewCaseDetailsComponent } from './view-case-details/view-case-details.component';
import { AcceptedCasesComponent } from './accepted-cases/accepted-cases.component';
import { LawyerChatComponent } from './lawyer-chat/lawyer-chat.component';
import { MesageListComponent } from '../+user/messaging-lawyer/mesage-list/mesage-list.component';

@NgModule({
  declarations: [
    LawyerdashboardComponent,
    ViewCaseDetailsComponent,
    AcceptedCasesComponent,
    LawyerChatComponent,
    // MesageListComponent
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