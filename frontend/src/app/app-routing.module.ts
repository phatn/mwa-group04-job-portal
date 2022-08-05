import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SearchJobsComponent } from "./job-seeker/search-jobs/search-jobs.component";
import { MyJobsComponent } from "./job-seeker/my-jobs/my-jobs.component";

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'search-jobs', component: SearchJobsComponent},
  { path: 'my-jobs', component: MyJobsComponent},
  { path: '**', redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
