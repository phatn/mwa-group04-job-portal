import { createAction, props } from '@ngrx/store';
import {User} from "../../model/User";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


// SEEKER ACTIONS
export const login = createAction(LOGIN, props<{email:string, password:string, role:string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{token:string}>());
