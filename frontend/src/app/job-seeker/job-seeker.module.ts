import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchJobsComponent } from "./search-jobs/search-jobs.component";
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { StringsJoinerPipe } from "../pipe/strings-joiner.pipe";



@NgModule({
  declarations: [
    SearchJobsComponent,
    MyJobsComponent,
    StringsJoinerPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchJobsComponent,
    MyJobsComponent,
    SearchJobsComponent
  ]
})
export class JobSeekerModule { }
