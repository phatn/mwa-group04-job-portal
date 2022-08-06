import { createReducer, on } from '@ngrx/store';
import {login, loginSuccess} from '../action/app.actions';

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
