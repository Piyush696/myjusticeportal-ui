import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CasesComponent } from './+cases/cases/cases.component';
import { ViewCaseComponent } from './+cases/view-case/view-case.component';
import { CaseFormComponent } from './+cases/case-form/case-form.component';
import { CreateCaseComponent } from './+cases/create-case/create-case.component';
import { EditCaseComponent } from './+cases/edit-case/edit-case.component';
import { ViewCaseFilesComponent } from './+cases/view-case-files/view-case-files.component';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HireLawyerComponent } from './hire-lawyer/hire-lawyer.component';
import { ViewLawyerComponent } from './hire-lawyer/view-lawyer/view-lawyer.component';
import { FindBondsmanComponent } from './find-bondsman/find-bondsman.component';
import { ViewBondsmanComponent } from './view-bondsman/view-bondsman.component';
import { MessagingLawyerComponent } from './messaging-lawyer/messaging-lawyer.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    CasesComponent,
    ViewCaseComponent,
    CaseFormComponent,
    CreateCaseComponent,
    EditCaseComponent,
    ViewCaseFilesComponent,
    HireLawyerComponent,
    ViewLawyerComponent,
    FindBondsmanComponent,
    ViewBondsmanComponent,
    MessagingLawyerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})

export class UserModule { }