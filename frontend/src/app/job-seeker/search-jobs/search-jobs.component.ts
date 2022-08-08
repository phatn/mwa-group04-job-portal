import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {Observable, Subject, takeUntil} from "rxjs";
import {jobApply, jobApplySuccess, jobSeekerSearch} from "../../store/action/seeker.actions";
import { Job } from "./job.model";
import { map } from "rxjs/operators";
import {UserService} from "../../login/user.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit, OnDestroy {

  searchJobForm!: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  jobs$: Observable<Array<Job>>;

  jobApplyResult$: Observable<string> = new Observable<string>();

  job$: Observable<Job> = new Observable<Job>();

  search() {
    const { keyword, city, state } = this.searchJobForm.value;
    this.store.dispatch(jobSeekerSearch({keyword, city, state}));
  }

  showDetail(job_id: string) {
    this.job$ = this.jobs$.pipe(
      map((jobs: any[]) => jobs.find((job: { _id: string; }) => job._id == job_id))
    )
  }

  apply(job_id: string) {
    const { email } = this.userService.decodeToken();
    this.store.dispatch(jobApply({job_id, email}));
  }

  constructor(private formBuilder : FormBuilder,
              private router: Router,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private store: Store<{jobReducer: any, jobApplyReducer: any}>) {

    this.jobs$ = store.select('jobReducer');
    this.jobApplyResult$ = store.select('jobApplyReducer');

    this.jobApplyResult$.pipe(takeUntil(this.destroy$))
      .subscribe(response => {
      if(response) {
        this.openSnackBar("Job applied, good luck!", "");
      }
    })
    this.searchJobForm = this.formBuilder.group({
      keyword: [],
      city: [],
      state: []
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
