import { Injectable } from '@angular/core';
import  { HttpClient } from "@angular/common/http";
import { User } from "../model/User";
import { environment } from '../../environments/environment';

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

  persistToken(token: string) {
    localStorage.setItem("TOKEN", token);
  }
}
