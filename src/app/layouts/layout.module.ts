import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LayoutRoutes } from './layout.routing';
import { FileUploadModule } from 'ng2-file-upload';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedMaterialModule } from 'app/shared-material/shared-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    SharedMaterialModule
  ],
  declarations: [
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class LayoutModule { }