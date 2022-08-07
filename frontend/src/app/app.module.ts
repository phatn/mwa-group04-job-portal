import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from "./layout/layout.module";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JobSeekerModule } from "./job-seeker/job-seeker.module";
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from "./login/user.service";
import { StoreModule } from '@ngrx/store';
import { appReducer } from "./store/reducer/app.reducer";
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from "./store/effect/user.effects";
import {EmployerModule} from "./employer/employer.module";
import { AttachTokenInterceptor } from './attach-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    JobSeekerModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({rootReducer: appReducer}),
    EffectsModule.forRoot([UserEffects]),
    EmployerModule
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
