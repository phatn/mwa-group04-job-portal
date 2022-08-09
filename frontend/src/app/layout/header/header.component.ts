import {Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../login/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  isLoggedIn = false;

  isSeeker = false;

  fullname:string = '';

  constructor(private router: Router, private userService: UserService, private zone: NgZone) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const {role, fullname} = this.userService.decodeToken();
        this.isSeeker = (role === 'seeker');
        this.fullname = fullname;
        if (event.url === '/login' || event.url === '/sign-up') {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoggedIn = localStorage.getItem('TOKEN') ? true : false;
  }


}
