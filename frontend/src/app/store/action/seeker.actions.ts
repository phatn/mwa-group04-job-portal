import { createAction, props } from '@ngrx/store';
import { Job } from "../../job-seeker/search-jobs/job.model";

export const JOB_SEEKER_SEARCH = 'JOB_SEEKER_SEARCH';
export const JOB_SEEKER_SEARCH_RESULT = 'JOB_SEEKER_SEARCH_RESULT';

// SEEKER ACTIONS
export const jobSeekerSearch = createAction(JOB_SEEKER_SEARCH, props<{keyword:string, city:string, state:string}>());
export const jobSeekerSearchResult = createAction(JOB_SEEKER_SEARCH_RESULT, props<{jobs: Array<Job>}>());
