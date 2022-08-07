import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EjobsService} from "../ejobs.service";
import {Ejob} from "../EJobInterface";
import {Router} from "@angular/router";
import {UserService} from "../../login/user.service";
import {globalVars} from "../../../environments/globalVars";

@Component({
  selector: 'app-add-ejob',
  templateUrl: './add-ejob.component.html',
  //styleUrls: ['./add-ejob.component.css']
  styleUrls: ['../ejob.css']
})
export class AddEjobComponent implements OnInit {
  form!: FormGroup;
  jobTypes = globalVars.jobTypes;
  job_type_selected : string = globalVars.jobTypes[0].value;
  jobStatuses = globalVars.jobStatuses;
  job_status_selected : string = globalVars.jobStatuses[0].value;

  constructor(
    private formBuilder : FormBuilder,
    private ejobService: EjobsService,
    private userService: UserService,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      salary: ['', Validators.required],
      job_type: ['', Validators.required],
      status: ['', Validators.required]
    });


  }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['', 'employers']);
  }
  addEJob(){
    console.log("addEJob", this.form.value);
    const job = {} as Ejob;
    job.title = this.form.value.title;
    job.description = this.form.value.description;
    job.skills = this.form.value.skills.split(",");
    job.location = {
      address: '',
      city: this.form.value.city,
      state: this.form.value.state,
      country: this.form.value.country
    };
    job.salary = this.form.value.salary;
    job.job_type = this.job_type_selected;
    job.status  = this.job_status_selected;

    const user = this.userService.decodeToken();
    job.created_by = user.user_id;
    job.employer = {
      _id: user.user_id,
      email: user.email,
      fullname: user.fullname,
      organization: ''
    };

    this.ejobService.addJob(job).subscribe(
      (reponse) =>{
        this.router.navigate(['', 'employers']);
      },
    );
  }

}
