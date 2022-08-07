import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess } from '../action/user.actions';

export const initialState = {};

export const userReducer = createReducer(
  initialState,
  on(login, state => state),
  on(loginSuccess, (state, {token}) =>  token)
)
