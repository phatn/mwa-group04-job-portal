import { createAction, props } from '@ngrx/store';


export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

// LOGIN ACTIONS
export const login = createAction(LOGIN, props<{email:string, password:string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{token: {token:string}}>());

/*
export const signup = createAction(SIGNUP,
  props<{role:string, email:string, password:string, fullname:string, education:string, skills:string,
    yoe:string, resume:any, organization:string, address:string, city:string, state:string, country:string}>());

 */

export const signup = createAction(SIGNUP, props<{formData: FormData}>());

export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{token: {token:string}}>());

