import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./login/user.service";

@Injectable({
  providedIn: 'root'
})
export class CheckEmployerGuard implements CanActivate {
  constructor(private userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.decodeToken();
    console.log("canActivate: ", user);
    if (user && user.role === "employer") {
      return true;
    } else {
      return false;
    }
  }

}
