import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./login/user.service";

@Injectable({
  providedIn: 'root'
})
export class CheckSeekerGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.decodeToken();
    const { role } = user;
    if(role && role === 'seeker') {
      return true;
    } else {
      this.router.navigate(['/', 'login']);
      return false;
    }
  }

}
