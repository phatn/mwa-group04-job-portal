import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import {Observable, Subject, takeUntil} from "rxjs";
import { Store } from "@ngrx/store";
import { login } from '../store/action/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  roles = [
    {value: 'JOB_SEEKER', viewValue: 'Job Seeker'},
    {value: 'EMPLOYER', viewValue: 'Employer'}
  ]

  loginForm!: FormGroup;

  token$!: Observable<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              private store: Store<{rootReducer: any}>
              ) {

    store.select('rootReducer')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          const {token} = response;
          if(token) {
            localStorage.setItem('TOKEN', token);
            //router.navigate(['/', 'search-jobs'])
            router.navigate(['/', 'employers'])
          }

        }
    );
    this.loginForm = this.formBuilder.group({
      email: [],
      password: [],
      role: []
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    }


  login(): void {
    const { email, password, role } = this.loginForm.value;
    this.store.dispatch(login({email, password, role}));
  }

  ngOnInit(): void {
  }

}
