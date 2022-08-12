import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { Observable, Subject, takeUntil} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/reducer/app.reducer";
import { login } from "../store/action/app.actions";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  token$!: Observable<string>;

  appState$: Observable<AppState>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              private store: Store<{appReducer: AppState}>
              ) {

    this.appState$ = this.store.select('appReducer');

    this.token$ = this.appState$.pipe(map(({token}) => token));

    this.appState$.pipe(takeUntil(this.destroy$)) .subscribe(response => {
        const { token } = response;
        if(token) {
          const { role } = this.userService.diriveUserFromToken(token);
          if(role) {
            localStorage.setItem('TOKEN', token);
            if(role === 'employer') {
              router.navigate(['/', 'employers']);
            } else if(role === 'seeker'){
              router.navigate(['/', 'seekers']);
            }
          }
        }
      })

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  login(): void {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(login({email, password}));
  }

  ngOnInit(): void {
  }

}
