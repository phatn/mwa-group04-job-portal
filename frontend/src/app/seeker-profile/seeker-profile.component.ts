import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../login/user.service";
import {ISeeker} from "./SeekerInterface";
import {globalVars} from "../../environments/globalVars";

export interface IApplicant{
  name: string,
  education: string
}

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  //styleUrls: ['./seeker-profile.component.css']
  styleUrls: ['../employer/ejob.css']
})
export class SeekerProfileComponent implements OnInit {

  disableSelect = false;

  form!: FormGroup;

  user!: ISeeker;

  seekerStatuses = globalVars.seekerStatuses;

  constructor(
    private userService: UserService,
    private formBuilder : FormBuilder,) {

    this.initFormValue();

    const user = this.userService.decodeToken();
    console.log("user: ", user);
    if(user && user.user_id) {
      this.userService.getSeekerById(user.user_id)
        .subscribe(
          (response) => {
            this.user = <ISeeker>response;
            console.log("this.user: ", this.user);
          }
        )
    }

    const obj: IApplicant = {name : "seeker1", education : "master of CS"};

  }

  ngOnInit(): void {
  }

  initFormValue(){
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      education: ['', Validators.required],
      skill_set: ['', Validators.required],
      yoe: ['', Validators.required],
      resume: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  cancel(){

  }

  updateProfile(){

  }
}
