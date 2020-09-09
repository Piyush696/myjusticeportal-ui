import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { CasesComponent } from 'app/pages/case/cases/cases.component';
import { ViewCaseComponent } from 'app/pages/case/view-case/view-case.component';
import { CaseFormComponent } from 'app/pages/case/case-form/case-form.component';
import { CreateCaseComponent } from 'app/pages/case/create-case/create-case.component';
import { EditCaseComponent } from 'app/pages/case/edit-case/edit-case.component';
import { ViewCaseFilesComponent } from 'app/pages/case/view-case-files/view-case-files.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CasesComponent,
    ViewCaseComponent,
    CaseFormComponent,
    CreateCaseComponent,
    EditCaseComponent,
    ViewCaseFilesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedMaterialModule
  ]
})

export class UserModule { }