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

  login(email: string, password: string, role: string) {
    console.log(email, password, role);
    return this.http.post<{token: string}>(`${environment.apiUrl}/users/login`, { email, password, role});
  }

  persistToken(token: string) {
    localStorage.setItem("TOKEN", token);
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
