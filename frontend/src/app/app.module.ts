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
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./login/user.service";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from "./store/effect/user.effects";
import { JobEffects } from "./store/effect/job.effects";
import { jobReducer } from "./store/reducer/job.reducer";
import { userReducer } from "./store/reducer/user.reducer";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
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
    JobSeekerModule,
    StoreModule.forRoot({ userReducer: userReducer, jobReducer: jobReducer }),
    EffectsModule.forRoot([UserEffects, JobEffects])
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
