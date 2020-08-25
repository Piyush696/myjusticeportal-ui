import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { FooterModule } from './layouts/footer/footer.module';
import { LayoutComponent } from './layouts/layout.component';
import { NavbarModule } from './layouts/navbar/navbar.module';
import { SidebarModule } from './layouts/sidebar/sidebar.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CacheService } from './services/cache.service';
import { LoginService } from './services/login.service';
import { RegistrationService } from './services/registration.service';
import { effects } from './store/effects';
import { rootReducer } from './store/reducers';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { SecurityQuestionComponent } from './pages/security-question/security-question.component';
import { ViewCaseFilesComponent } from './pages/view-case-files/view-case-files.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MatIconModule } from '@angular/material/icon';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { FacilityRegistrationComponent } from './pages/facility-registration/facility-registration.component';
import { LawyerRegistrationComponent } from './pages/lawyer-registration/lawyer-registration.component';
import { BondsmanRegistrationComponent } from './pages/bondsman-registration/bondsman-registration.component';
import { ParalegalRegistrationComponent } from './pages/paralegal-registration/paralegal-registration.component';
import { PublicDefenderRegistrationComponent } from './pages/public-defender-registration/public-defender-registration.component';
import { EmailRegistrationComponent } from './shared/email-registration/email-registration.component';
import { MobileRegistrationComponent } from './shared/mobile-registration/mobile-registration.component';
import { AdditionalInfoComponent } from './shared/additional-info/additional-info.component';
import { LibraryLinkService } from './services/library-link.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegistrationComponent,
    SecurityQuestionComponent,
    ForgetPasswordComponent,
    ViewCaseFilesComponent,
    UserRegistrationComponent,
    FacilityRegistrationComponent,
    LawyerRegistrationComponent,
    BondsmanRegistrationComponent,
    ParalegalRegistrationComponent,
    PublicDefenderRegistrationComponent,
    EmailRegistrationComponent,
    MobileRegistrationComponent,
    AdditionalInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FooterModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    FileUploadModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  providers: [
    RegistrationService,
    CacheService,
    LoginService,
    LibraryLinkService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));