import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
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
import { LoginComponent } from './pages/all-login/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CacheService } from './services/cache.service';
import { LoginService } from './services/login.service';
import { RegistrationService } from './services/registration.service';
import { effects } from './store/effects';
import { rootReducer } from './store/reducers';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { SecurityQuestionComponent } from './pages/security-question/security-question.component';
import { EmailRegistrationComponent } from './shared/email-registration/email-registration.component';
import { MobileRegistrationComponent } from './shared/mobile-registration/mobile-registration.component';
import { AdditionalInfoComponent } from './shared/additional-info/additional-info.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { FacilityService } from './services/facility.service';
import { AuthLoadService } from './services/auth/auth.service';
import { OrganisationComponent } from './shared/organisation/organisation.component';
import { SelectFacilityComponent } from './shared/select-facility/select-facility.component';
import { UserLoginComponent } from './pages/all-login/user-login/user-login.component';
import { UserRegistrationComponent } from './pages/all-registration/user-registration/user-registration.component';
import { FacilityRegistrationComponent } from './pages/all-registration/facility-registration/facility-registration.component';
import { LawyerRegistrationComponent } from './pages/all-registration/lawyer-registration/lawyer-registration.component';
import { ParalegalRegistrationComponent } from './pages/all-registration/paralegal-registration/paralegal-registration.component';
import { PublicDefenderRegistrationComponent } from './pages/all-registration/public-defender-registration/public-defender-registration.component';
import { BondsmanRegistrationComponent } from './pages/all-registration/bondsman-registration/bondsman-registration.component';
import { AccountReviewComponent } from './pages/account-review/account-review.component';
import { InvitedLawyerComponent } from './pages/all-registration/invited-lawyer/invited-lawyer.component';
import { InvitedParalegalComponent } from './pages/all-registration/invited-paralegal/invited-paralegal.component';
import { InvitedPublicDefenderComponent } from './pages/all-registration/invited-public-defender/invited-public-defender.component';
import { InvitedBondsmanComponent } from './pages/all-registration/invited-bondsman/invited-bondsman.component';
import { SharedMaterialModule } from './shared-material/shared-material.module';

export function usersProviderFactory(provider: AuthLoadService) {
  return () => provider.setUserbyAPI();
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegistrationComponent,
    SecurityQuestionComponent,
    ForgetPasswordComponent,
    // ViewCaseFilesComponent,
    UserRegistrationComponent,
    FacilityRegistrationComponent,
    LawyerRegistrationComponent,
    ParalegalRegistrationComponent,
    PublicDefenderRegistrationComponent,
    BondsmanRegistrationComponent,
    EmailRegistrationComponent,
    MobileRegistrationComponent,
    AdditionalInfoComponent,
    ResetPasswordComponent,
    OrganisationComponent,
    SelectFacilityComponent,
    UserLoginComponent,
    AccountReviewComponent,
    InvitedLawyerComponent,
    InvitedParalegalComponent,
    InvitedPublicDefenderComponent,
    InvitedBondsmanComponent
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
    SharedMaterialModule
  ],
  providers: [
    RegistrationService,
    CacheService,
    LoginService,
    FacilityService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    AuthLoadService,
    { provide: APP_INITIALIZER, useFactory: usersProviderFactory, deps: [AuthLoadService], multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));