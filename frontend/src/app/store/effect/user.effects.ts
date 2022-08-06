import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { UserService } from "../../login/user.service";
import { login, loginSuccess, LOGIN, LOGIN_SUCCESS } from "../action/app.actions";

@Injectable()
export class UserEffects {


  userLogin$ = createEffect(() =>  this.actions$.pipe(
      ofType(LOGIN),
      exhaustMap((action: {email: string, password: string, role: string}) => (this.userService.login(action.email, action.password, action.role))
        .pipe(
          map(token => {
            return loginSuccess(token);
          }),
          catchError(() => EMPTY))
      )
    )
  );


  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
