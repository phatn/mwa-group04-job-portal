import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  isLoggedIn = false;

  constructor(private router: Router) {

  }

  logout() {
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoggedIn = localStorage.getItem('TOKEN') ? true : false;
  }


}
