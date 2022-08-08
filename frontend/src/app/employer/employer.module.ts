import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEjobComponent } from './add-ejob/add-ejob.component';
import { RouterModule } from '@angular/router';
import {MaterialModule} from "../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EDashboardComponent } from './edashboard.component';
import {ListEjobsComponent} from "./list-ejobs/list-ejobs.component";
import { EditEjobComponent } from './edit-ejob/edit-ejob.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [

    EDashboardComponent,
    AddEjobComponent,
    ListEjobsComponent,
    EditEjobComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule.forChild([
      {path: '', component: EDashboardComponent},
      {path: 'jobs/add', component: AddEjobComponent},
      {path: 'jobs/edit/:job_id', component: EditEjobComponent},
      {path: 'jobs/view/:job_id', component: EditEjobComponent}
    ]),
    FormsModule,
  ]
})
export class EmployerModule { }
