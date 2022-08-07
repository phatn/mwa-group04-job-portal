import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject} from "rxjs";
import { jobSeekerSearch } from "../../store/action/seeker.actions";
import { Job } from "./job.model";

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit, OnDestroy {

  searchJobForm!: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  jobs$: Observable<Array<Job>>;

  job!: Job;

  search() {
    const { keyword, city, state } = this.searchJobForm.value;
    this.store.dispatch(jobSeekerSearch({keyword, city, state}));
  }


  showDetail(job_id: string) {


  }
  constructor(private formBuilder : FormBuilder,
              private router: Router,
              private store: Store<{jobReducer: any}>) {

    this.jobs$ = store.select('jobReducer');

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

}
