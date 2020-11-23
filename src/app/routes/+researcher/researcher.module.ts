import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherRoutingModule } from './researcher-routing.module';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';
import { SharedComponentsModule } from '../+shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParalegalDashboardComponent } from './paralegal-dashboard/paralegal-dashboard.component';
import { LegalResearchAssistanceComponent } from './legal-research-assistance/legal-research-assistance.component';
import { ViewLegalResearchFormComponent } from './view-legal-research-form/view-legal-research-form.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    ParalegalDashboardComponent,
    LegalResearchAssistanceComponent,
    ViewLegalResearchFormComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    ResearcherRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})

export class ResearcherModule { }