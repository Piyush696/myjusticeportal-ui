import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSettingsComponent } from 'app/pages/app-settings/app-settings.component';
import { CaseFormComponent } from 'app/pages/case-form/case-form.component';
import { CasesComponent } from 'app/pages/cases/cases.component';
import { CreateCaseComponent } from 'app/pages/create-case/create-case.component';
import { EditCaseComponent } from 'app/pages/edit-case/edit-case.component';
import { MyAccountComponent } from 'app/pages/my-account/my-account.component';
import { PostageAppComponent } from 'app/pages/postage-app/postage-app.component';
import { TwilioCredentialsComponent } from 'app/pages/twilio-credentials/twilio-credentials.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { ViewCaseComponent } from 'app/pages/view-case/view-case.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { IconsComponent } from '../pages/icons/icons.component';
import { MapsComponent } from '../pages/maps/maps.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { TableComponent } from '../pages/table/table.component';
import { TypographyComponent } from '../pages/typography/typography.component';
import { LayoutRoutes } from './layout.routing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserDetailsComponent } from 'app/pages/user-details/user-details.component';
import { FacilityComponent } from 'app/pages/facility/facility.component';
import { UserDashboardComponent } from 'app/pages/user-dashboard/user-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UsersComponent,
    UserDetailsComponent,
    MyAccountComponent,
    CasesComponent,
    ViewCaseComponent,
    CaseFormComponent,
    CreateCaseComponent,
    EditCaseComponent,
    AppSettingsComponent,
    PostageAppComponent,
    TwilioCredentialsComponent,
    FacilityComponent,
    UserDashboardComponent
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class LayoutModule { }