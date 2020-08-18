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
import { SecurityQuestionComponent } from './pages/security-question/security-question.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { Dashboardv3Component } from './pages/dashboardv3/dashboardv3.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegistrationComponent,
    SecurityQuestionComponent,
    ForgetPasswordComponent,
    Dashboardv3Component,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    MatCardModule,
    MatSelectModule,
    NavbarModule,
    HttpClientModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    ToastrModule.forRoot(),
    FooterModule,
    MatCheckboxModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    RegistrationService,
    CacheService,
    LoginService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
