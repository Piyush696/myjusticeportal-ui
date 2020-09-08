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
import { MyAccountComponent } from 'app/pages/my-account/my-account.component';
import { PostageAppComponent } from 'app/pages/postage-app/postage-app.component';
import { TwilioCredentialsComponent } from 'app/pages/twilio-credentials/twilio-credentials.component';
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
import { FacilityComponent } from 'app/pages/facility/facility.component';
import { UsersComponent } from 'app/pages/all-users/users/users.component';
import { UserDetailsComponent } from 'app/pages/all-users/user-details/user-details.component';
import { CasesComponent } from 'app/pages/case/cases/cases.component';
import { ViewCaseComponent } from 'app/pages/case/view-case/view-case.component';
import { CaseFormComponent } from 'app/pages/case/case-form/case-form.component';
import { CreateCaseComponent } from 'app/pages/case/create-case/create-case.component';
import { EditCaseComponent } from 'app/pages/case/edit-case/edit-case.component';
import { ViewCaseFilesComponent } from 'app/pages/case/view-case-files/view-case-files.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ManageOrganisationComponent } from 'app/pages/manage-organisation/manage-organisation.component';
import { ViewFacilitiesComponent } from 'app/pages/view-facilities/view-facilities.component';
import { ViewUsersComponent } from 'app/pages/view-users/view-users.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BondsmanDashboardComponent } from 'app/pages/all-dashboards/bondsman-dashboard/bondsman-dashboard.component';
import { ParalegalDashboardComponent } from 'app/pages/all-dashboards/paralegal-dashboard/paralegal-dashboard.component';
import { FacilityDashboardComponent } from 'app/pages/all-dashboards/facility-dashboard/facility-dashboard.component';
import { DefenderDashboardComponent } from 'app/pages/all-dashboards/defender-dashboard/defender-dashboard.component';
import { UserDashboardComponent } from 'app/pages/all-dashboards/user-dashboard/user-dashboard.component';
import { LawyerdashboardComponent } from 'app/pages/all-dashboards/lawyerdashboard/lawyerdashboard.component';
import { SuperadminDashboardComponent } from 'app/pages/all-registration/superadmin-dashboard/superadmin-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  declarations: [
    DashboardComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    MyAccountComponent,
    UsersComponent,
    UserDetailsComponent,
    CasesComponent,
    ViewCaseComponent,
    CaseFormComponent,
    CreateCaseComponent,
    EditCaseComponent,
    ViewCaseFilesComponent,
    AppSettingsComponent,
    PostageAppComponent,
    TwilioCredentialsComponent,
    FacilityComponent,
    UserDashboardComponent,
    LawyerdashboardComponent,
    ManageOrganisationComponent,
    ViewFacilitiesComponent,
    ViewUsersComponent,
    BondsmanDashboardComponent,
    ParalegalDashboardComponent,
    FacilityDashboardComponent,
    DefenderDashboardComponent,
    SuperadminDashboardComponent
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class LayoutModule { }