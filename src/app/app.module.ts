import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from '@angular/router';
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
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegistrationComponent
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
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FooterModule,
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
