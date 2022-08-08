import { createReducer, on } from '@ngrx/store';
import {
  jobApply,
  jobApplySuccess,
  jobSeekerMyJob, jobSeekerMyJobResult,
  jobSeekerSearch,
  jobSeekerSearchResult
} from "../action/seeker.actions";
import { Job } from "../../job-seeker/search-jobs/job.model";

export const initialState: Array<Job> = [];

export const jobReducer = createReducer(
  initialState,
  on(jobSeekerSearch, state => state),
  on(jobSeekerSearchResult, (state, {jobs}) => jobs),
  on(jobSeekerMyJob, state => state),
  on(jobSeekerMyJobResult, (state, {jobs}) => jobs)
);
