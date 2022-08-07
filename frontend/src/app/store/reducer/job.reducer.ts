import { createReducer, on } from '@ngrx/store';
import { jobSeekerSearch, jobSeekerSearchResult } from "../action/seeker.actions";
import { Job } from "../../job-seeker/search-jobs/job.model";

export const initialState: Array<Job> = [];

export const jobReducer = createReducer(
  initialState,
  on(jobSeekerSearch, state => state),
  on(jobSeekerSearchResult, (state, {jobs}) => jobs)
);
