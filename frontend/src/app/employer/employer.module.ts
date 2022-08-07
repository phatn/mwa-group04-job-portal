import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEjobComponent } from './add-ejob/add-ejob.component';
import { RouterModule } from '@angular/router';
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { EDashboardComponent } from './edashboard.component';
import {ListEjobsComponent} from "./list-ejobs/list-ejobs.component";

@NgModule({
  declarations: [

    EDashboardComponent,
    AddEjobComponent,
    ListEjobsComponent
  ],
  exports: [
    ListEjobsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: EDashboardComponent},
      {path: 'jobs/add', component: AddEjobComponent},
      //{ path: 'jobs/edit/:job_id', component: EditComponent }
    ]),
  ]
})
export class EmployerModule { }
