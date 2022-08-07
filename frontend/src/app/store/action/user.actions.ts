import { createAction, props } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


// LOGIN ACTIONS
export const login = createAction(LOGIN, props<{email:string, password:string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{token: {token:string}}>());
