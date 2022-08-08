import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {signup} from "../store/action/user.actions";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../login/user.service";
import {Router} from "@angular/router";

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  isSeeker:boolean = true;

  roles: Role[] = [
    {value: 'seeker', viewValue: 'Seeker'},
    {value: 'employer', viewValue: 'Employer'}
  ];

  token$!: Observable<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              private store: Store<{userReducer: any}>
  ) {

    store.select('userReducer')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          const {token} = response;
          if(token) {
            localStorage.setItem('TOKEN', token);
            const user = this.userService.decodeToken();
            if(user.role === 'employer') {
              router.navigate(['/', 'employers']);
            }else {
              router.navigate(['/', 'search-jobs']);
            }
          }
        }
      );



    this.signUpForm = this.formBuilder.group({
      role: [],
      email: [],
      password: [],
      fullname: [],
      education: [],
      skills:[],
      yoe: [],
      resume: [],
      organization: [],
      address: [],
      city: [],
      state: [],
      country: []
    });
  }

  signup() {
    const {role, email, password, fullname, education, skills, yoe, organization, address, city, state, country} = this.signUpForm.value;
    const obj = {role, email, password, fullname, education, skills, yoe, organization, address, city, state, country};
    console.log(JSON.stringify(obj));
    this.store.dispatch(signup(obj));
  }


  onRoleChange($event:any) {
    this.isSeeker = $event.value === 'seeker';
  }

  ngOnInit(): void {
  }

}
