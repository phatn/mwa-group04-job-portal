import { Component, OnInit } from '@angular/core';
import {Ejob} from "../EJobInterface";
import {EjobsService} from "../ejobs.service";
import {Router} from "@angular/router";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-list-ejobs',
  templateUrl: './list-ejobs.component.html',
  styleUrls: ['./list-ejobs.component.css']
})
export class ListEjobsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'job_type', 'organization', 'actions'];
  jobs: Array<Ejob> = [];

  constructor(
    private ejobService: EjobsService,
    private router: Router
  ) {
    this.ejobService.getJobs()
      .subscribe(
        (response) => this.jobs = response
      )
  }

  ngOnInit(): void {
  }

  viewEJob(job: Ejob){
    this.router.navigate(['', 'employers', 'jobs', 'view', job._id]);
  }

  editEJob(job: Ejob){
    this.router.navigate(['', 'employers', 'jobs', 'edit', job._id]);
  }
}
