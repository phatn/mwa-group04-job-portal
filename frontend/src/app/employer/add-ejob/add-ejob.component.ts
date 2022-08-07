import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {EjobsService} from "../ejobs.service";
import {Ejob} from "../EJobInterface";
import {Router} from "@angular/router";
import {UserService} from "../../login/user.service";

@Component({
  selector: 'app-add-ejob',
  templateUrl: './add-ejob.component.html',
  styleUrls: ['./add-ejob.component.css']
})
export class AddEjobComponent implements OnInit {
  form!: FormGroup;
  jobTypes = [
    {value: 'FULLTIME', viewValue: 'Full-time'},
    {value: 'PARTTIME', viewValue: 'Part-time'}
  ];

  jobStatuses = [
    {value: 'ACTIVE', viewValue: 'Active'},
    {value: 'INACTIVE', viewValue: 'Inactive'}
  ];

  jobs: Array<Ejob> = [];

  constructor(
    private formBuilder : FormBuilder,
    private ejobService: EjobsService,
    private userService: UserService,
    private router: Router
  ) {

    //load all jobs belongs to the employer
    this.ejobService.getJobs()
      .subscribe(
        (response) => {
          this.jobs = response;
        }
      )

    this.form = this.formBuilder.group({
      title: [],
      description: [],
      skills: [],
      city: [],
      state: [],
      country: [],
      job_type: [],
      status: ['']
    });


  }

  ngOnInit(): void {
  }

  cancelAdd(){
    this.router.navigate(['', 'employers']);
  }
  addEJob(){
    console.log("addEJob", this.form.value);
    const job = {} as Ejob;
    job.title = this.form.value.title;
    job.description = this.form.value.description;
    // this.form.value.skills.split(" ").forEach((skill) => {
    //
    // });
    job.location = {
      address: '',
      city: this.form.value.city,
      state: this.form.value.state,
      country: this.form.value.country
    };
    //job.location.city = ;
    //job.location.state = this.form.value.state;
    //job.location.country = this.form.value.country;
    job.job_type = this.form.value.job_type;
    job.status  = this.form.value.status;

    const user = this.userService.decodeToken();
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
