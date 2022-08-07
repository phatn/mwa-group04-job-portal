import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Job } from "./job.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {

  constructor(private http: HttpClient) {
  }

  searchJobs(keyword: string, city: string, state:string): Observable<Array<Job>> {
    const queryMap = new Map();
    if(keyword) {
      queryMap.set('keyword', keyword);
    }

    if(city) {
      queryMap.set('city', city);
    }

    if(state) {
      queryMap.set('state', state);
    }

    let query = '';
    queryMap.forEach((v, k) => {
      query += (k + '=' + v);
    })
    return this.http.get<Array<Job>>(`${environment.apiUrl}/jobs/search?${query}`);
  }
}
