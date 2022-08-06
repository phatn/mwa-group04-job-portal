import { createReducer, on } from '@ngrx/store';
import {login, loginSuccess} from '../action/user.actions';

export const initialState = {};

export const appReducer = createReducer(
  initialState,
  on(login, (state) => {
    return {...state};
  }),
  on(loginSuccess, (state, token) => {
    return token;
  })
);
