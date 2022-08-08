import { Injectable } from '@angular/core';
import  { HttpClient } from "@angular/common/http";

import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';
import {User} from "./UserInterface";

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

  signup(role:string, email:string, password:string, fullname:string, education:string, skills:string,
           yeo:string, organization:string, address:string, city:string, state:string, country:string) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/users/signup`,
      { role, email, password, fullname, education, skills, yeo, organization, address, city, state, country});
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
}
