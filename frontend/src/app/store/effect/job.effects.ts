import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';

import { JobSeekerService } from "../../job-seeker/search-jobs/job-seeker.service";
import { JOB_SEEKER_SEARCH, jobSeekerSearch, jobSeekerSearchResult } from "../action/seeker.actions";
import {Job} from "../../job-seeker/search-jobs/job.model";

@Injectable()
export class JobEffects {

  jobSearch$ = createEffect(() =>  this.actions$.pipe(
      ofType(JOB_SEEKER_SEARCH),
      exhaustMap((action: {keyword: string, city: string, state: string}) => this.jobSeekerService.searchJobs(action.keyword, action.city, action.state)
        .pipe(
          map(jobs => {
            return jobSeekerSearchResult({jobs});
          }),
          catchError(() => EMPTY))
      )
    )
  );


  constructor(
    private actions$: Actions,
    private jobSeekerService: JobSeekerService
  ) {}
}
