import { createReducer, on } from '@ngrx/store';

import {
  jobApply, jobApplyResult,
  jobSeekerMyJob, jobSeekerMyJobResult,
  jobSeekerSearch,
  jobSeekerSearchResult, login, loginSuccess, logout, resetMessage, signup, signupSuccess
} from "../action/app.actions";
import { Job } from "../../job-seeker/search-jobs/job.model";

export interface AppState {
  jobsSearchResult: { jobs: Array<Job>, total:number },
  jobApplyResult: { success: string, error: string },
  credential: {email: string, password: string},
  token: string,
  formData: FormData
}


export const initialState: AppState =  {
  jobsSearchResult: { jobs: [], total: 0 },
  jobApplyResult: {success: '', error: '' },
  credential: {email: '', password: ''},
  token: '',
  formData: new FormData()
};

export const appReducer = createReducer(
  initialState,
  on(jobSeekerSearch, state => ({...state})),
  on(jobSeekerSearchResult, (state, jobsSearchResult) => ({...state, jobsSearchResult})),
  on(jobSeekerMyJob, state => ({...state})),
  on(jobSeekerMyJobResult, (state, jobsSearchResult) => ({...state, jobsSearchResult})),
  on(jobApply, state => ({...state})),
  on(jobApplyResult, (state, jobApplyResult) => ({...state, jobApplyResult})),
  on(resetMessage, state => ({...state, jobApplyResult: {success: '', error: '' }})),
  on(login, state => ({...state})),
  on(loginSuccess, (state, {token}) => ({...state, token})),
  on(logout, state => initialState),
  on(signup, state => ({...state})),
  on(signupSuccess, (state, {token}) => ({...initialState, token}))
);
