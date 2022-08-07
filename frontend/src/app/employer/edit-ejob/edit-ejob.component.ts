import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EjobsService} from "../ejobs.service";
import {UserService} from "../../login/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ejob} from "../EJobInterface";
import { mergeMap } from 'rxjs';
import {globalVars} from "../../../environments/globalVars";

@Component({
  selector: 'app-edit-ejob',
  templateUrl: './edit-ejob.component.html',
  styleUrls: ['./edit-ejob.component.css']
})
export class EditEjobComponent implements OnInit {

  form!: FormGroup;
  job!: Ejob;
  jobTypes = globalVars.jobTypes;
  job_type_selected : string = globalVars.jobTypes[0].value;
  jobStatuses = globalVars.jobStatuses;
  job_status_selected : string = globalVars.jobStatuses[0].value;

  applicantColumns: string[] = ['title', 'description', 'job_type', 'organization', 'actions'];
  applicants!: Array<{
        _id: string,
        email: string,
        fullname: string,
        resume: string,
        education: string,
        skills: [{ type: string }],
        yoe: number,
        status: string
  }>;

  constructor(
    private formBuilder : FormBuilder,
    private ejobService: EjobsService,
    private userService: UserService,
    private router: Router,
    private ar: ActivatedRoute
  ) {

    console.log(this.job_type_selected);

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      job_type: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.ar.paramMap
      .pipe(
        mergeMap((params: any) => this.ejobService.getJobById(params.get('job_id')))
      )
      .subscribe(
        (res) => {
          this.job = res;
          this.applicants = this.job.applied_by;

          this.form.get('title')?.setValue(this.job.title);
          this.form.get('description')?.setValue(this.job.description);
          this.form.get('skills')?.setValue(this.job.skills.join());
          this.form.get('city')?.setValue(this.job.location.city);
          this.form.get('state')?.setValue(this.job.location.state);
          this.form.get('country')?.setValue(this.job.location.country);
          //this.form.get('job_type')?.setValue(this.job.job_type);
          //this.form.get('status')?.setValue(this.job.status);
        },
      )

  }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['', 'employers']);
  }

  editEJob(){
    console.log("editEJob", this.form.value);
    console.log(this.form.value.job_type, this.job_type_selected);
    // this.job.title = this.form.value.title;
    // this.job.description = this.form.value.description;
    // this.job.skills = this.form.value.skills.split(",");
    // this.job.location = {
    //   address: '',
    //   city: this.form.value.city,
    //   state: this.form.value.state,
    //   country: this.form.value.country
    // };
    // this.job.job_type = this.form.value.job_type.text;
    // this.job.status  = this.form.value.status.text;
    //
    // const user = this.userService.decodeToken();
    // this.job.created_by = user.user_id;
    // this.job.employer = {
    //   _id: user.user_id,
    //   email: user.email,
    //   fullname: user.fullname,
    //   organization: ''
    // };
    //
    // this.ejobService.updateJobById(this.job._id, this.job).subscribe(
    //   (reponse) =>{
    //     this.router.navigate(['', 'employers']);
    //   },
    // );
  }

  viewProfile(){
  }
}
