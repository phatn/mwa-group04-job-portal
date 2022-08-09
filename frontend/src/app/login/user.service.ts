import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';
import {User} from "./UserInterface";
import {Ejob} from "../employer/EJobInterface";
import {ISeeker} from "../seeker-profile/SeekerInterface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    console.log(`${environment.apiUrl}`)
  }

  login(email: string, password: string) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/users/login`, { email, password});
  }

  signup(formData: FormData) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/users`, formData);
  }

  persistToken(token: string) {
    localStorage.setItem("TOKEN", token);
  }

  clearToken() {
    localStorage.removeItem('TOKEN');
  }

  decodeToken(): User {
    let user = {} as User;
    const token = localStorage.getItem('TOKEN');
    if (token) {
      user = jwt_decode(token);
    }

    return user;
  }

  getSeekerById(id: string) {
    return this.http.get(`${environment.apiUrl}/seekers/` + id);
  }

  updateSeekerById(seeker_id: string, seeker: ISeeker) {
    return this.http.patch(`${environment.apiUrl}/seekers/` + seeker_id, seeker);
  }
}
