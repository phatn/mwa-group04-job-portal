import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchJobsComponent } from "./search-jobs/search-jobs.component";
import { MyJobsComponent } from './my-jobs/my-jobs.component';



@NgModule({
  declarations: [
    SearchJobsComponent,
    MyJobsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchJobsComponent,
    MyJobsComponent
  ]
})
export class JobSeekerModule { }
