import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from 'app/pages/users/users.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { IconsComponent } from '../pages/icons/icons.component';
import { MapsComponent } from '../pages/maps/maps.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { TableComponent } from '../pages/table/table.component';
import { TypographyComponent } from '../pages/typography/typography.component';
import { UserComponent } from '../pages/user/user.component';
import { LayoutRoutes } from './layout.routing';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MyAccountComponent } from 'app/pages/my-account/my-account.component';
import { ToastrModule } from 'ngx-toastr';
import { CasesComponent } from 'app/pages/cases/cases.component';
import { NewCaseComponent } from 'app/pages/new-case/new-case.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UsersComponent,
    MyAccountComponent,
    CasesComponent,
    NewCaseComponent
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class LayoutModule { }
