import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Store } from "@ngrx/store";
import { signup } from "../store/action/app.actions";
import { Observable, Subject } from "rxjs";
import { UserService } from "../login/user.service";
import { Router } from "@angular/router";
import { AppState } from "../store/reducer/app.reducer";

interface SelectControl {
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

  roles: SelectControl[] = [
    {value: 'seeker', viewValue: 'Seeker'},
    {value: 'employer', viewValue: 'Employer'}
  ];

  countries: SelectControl[] = [
    {value: 'USA', viewValue: 'USA'},
    {value: 'Canada', viewValue: 'Canada'}
  ];

  appState$: Observable<AppState>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              private store: Store<{appReducer: AppState}>) {
    this.appState$ = this.store.select('appReducer');

    this.appState$.subscribe(response => {
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


    this.signUpForm = this.formBuilder.group({
      role: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      education: ['', Validators.required],
      skills:['', Validators.required],
      yoe: ['', Validators.required],
      file: ['', Validators.required],
      resume: [null],
      organization: [''],
      address: [''],
      city: [''],
      state: [''],
      country: ['']
    });
  }

  onFileChange($event:any) {
    if ($event.target.files.length > 0) {
        const file = $event.target.files[0];
        this.signUpForm.patchValue({
          resume: file
        });
    }
  }

  signup() {
    const {role, email, password, fullname, education, skills, yoe, organization, address, city, state, country} = this.signUpForm.value;
    let formData = new FormData();
    formData.append('role', role);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullname', fullname);
    formData.append('education', education);
    formData.append('skills', skills);
    formData.append('yoe', yoe);
    formData.append('resume', this.signUpForm.get('resume')?.value);
    formData.append('organization', organization);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);

    this.store.dispatch(signup({formData}));
  }

  onRoleChange($event:any) {
    this.isSeeker = ($event.value === 'seeker');
    this.signUpForm.clearValidators();
    this.signUpForm.controls['role'].setValidators(Validators.required);
    this.signUpForm.controls['email'].setValidators([Validators.required, Validators.email]);
    this.signUpForm.controls['password'].setValidators(Validators.required);
    this.signUpForm.controls['fullname'].setValidators(Validators.required);

    if(this.isSeeker) {
      this.signUpForm.controls['education'].setValidators(Validators.required);
      this.signUpForm.controls['skills'].setValidators(Validators.required);
      this.signUpForm.controls['yoe'].setValidators(Validators.required);
      this.signUpForm.controls['file'].setValidators(Validators.required);

    } else {
      this.signUpForm.controls['organization'].setValidators(Validators.required);
      this.signUpForm.controls['address'].setValidators(Validators.required);
      this.signUpForm.controls['city'].setValidators(Validators.required);
      this.signUpForm.controls['state'].setValidators(Validators.required);
      this.signUpForm.controls['country'].setValidators(Validators.required);
    }
  }

  ngOnInit(): void {

  }

}
