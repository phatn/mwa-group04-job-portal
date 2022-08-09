import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EjobsService} from "../ejobs.service";
import {UserService} from "../../login/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ejob} from "../EJobInterface";
import { mergeMap } from 'rxjs';
import {globalVars} from "../../../environments/globalVars";
import {Applicant} from "../ApplicantInterface";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ICountry, IState, ICity} from "../CountryInterface";
import {UtilsService} from "../utilsService";

@Component({
  selector: 'app-edit-ejob',
  templateUrl: './edit-ejob.component.html',
  //template: `<ckeditor [editor]="Editor" data="<p>Hello, world!</p>"></ckeditor>`,
  //styleUrls: ['./edit-ejob.component.css']
  styleUrls: ['../ejob.css']
})
export class EditEjobComponent implements OnInit {

  //mode: view / edit
  mode!: any;
  disableSelect = false;

  //form
  form!: FormGroup;
  job!: Ejob;

  //public variables for configuration
  jobTypes = globalVars.jobTypes;
  //job_type_selected! : string;
  jobStatuses = globalVars.jobStatuses;
  //job_status_selected! : string ;
  countries!: ICountry[];
  states!: IState[];
  cities!: ICity[];

  //table
  displayedColumns: string[] = ['fullname', 'skills', 'yoe', 'application_status'];
  applicants!: [{ type: Applicant }];
  applicationStatuses = globalVars.applicationStatuses;
  clickedApplicant! : Applicant;

  //richtexteditor
  public Editor = ClassicEditor;

  constructor(
    private formBuilder : FormBuilder,
    private ejobService: EjobsService,
    private userService: UserService,
    private utilsService: UtilsService,
    private router: Router,
    private ar: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {

    this.initForm();

    //Edit / View mode
    if(this.router.url.includes('view')){
      this.disableSelect = true;
    }

    this.utilsService.getLocations()
      .subscribe(
        (response) => {
          this.countries = <Array<ICountry>>response;
        }
      );

    //Read job information and load into form
    this.ar.paramMap
      .pipe(
        mergeMap((params: any) => {
          return this.ejobService.getJobById(params.get('job_id'));
        })
      )
      .subscribe(
        (res) => {
          this.job = res;
          this.applicants = this.job.applied_by;

          this.form.get('title')?.setValue(this.job.title);
          this.form.get('description')?.setValue(this.job.description);
          this.form.get('skills')?.setValue(this.job.skills.toString());
          this.form.get('country')?.setValue(this.job.location.country);
          this.refreshStates();
          this.form.get('state')?.setValue(this.job.location.state);
          this.refreshCities();
          this.form.get('city')?.setValue(this.job.location.city);


          this.form.get('salary')?.setValue(this.job.salary);

          this.form.get('job_type')?.setValue(this.job.job_type);
          //this.job_type_selected =this.form.value.job_type;

          this.form.get('status')?.setValue(this.job.status);
          //this.job_status_selected =this.form.value.status;

        },
      )
  }

  initForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
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

  editEJob(){
    console.log("editEJob", this.form.value);

    this.job.title = this.form.value.title;
    this.job.description = this.form.value.description;
    this.job.skills = this.form.value.skills.split(",");
    this.job.location.city= this.form.value.city;
    this.job.location.state = this.form.value.state;
    this.job.location.country = this.form.value.country;
    this.job.salary = this.form.value.salary;
    this.job.job_type = this.form.value.job_type;
    this.job.status  = this.form.value.status;

    this.job.applied_by = this.applicants;
    console.log("this.job.applied_by: ", this.job.applied_by);

    this.ejobService.updateJobById(this.job._id, this.job).subscribe(
      (reponse) =>{
        this.openSnackBar("Job updated successfully", "");
      },
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "top",
    });
  }

  refreshStates(){
    console.log("refreshStates");
    if(this.form.get('country')){
      const country: string = this.form.get('country')?.value;
      this.states = this.countries.find((c) => c.name === country)?.states || [];
    }
    //this.refreshCities();
  }

  refreshCities(){
    console.log("refreshCities");
    if(this.form.get('state')){
      const state: string = this.form.get('state')?.value;
      this.cities = this.states.find((c) => c.name === state)?.cities || [];
    }
  }
}
