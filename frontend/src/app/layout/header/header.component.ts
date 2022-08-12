import { Component, OnInit } from '@angular/core';
import { Store} from "@ngrx/store";
import { AppState} from "../../store/reducer/app.reducer";
import { logout } from "../../store/action/app.actions";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import jwt_decode from "jwt-decode";
import { User } from "../../login/UserInterface";
import { UserService} from "../../login/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token$!: Observable<string>;

  credential$!: Observable<{role: string, fullname: string}>;

  appState$: Observable<AppState>;

  constructor(private store: Store<{appReducer: AppState}>,
              private userService: UserService,
              private router: Router) {
    this.appState$ = this.store.select('appReducer');

    this.credential$ = this.appState$.pipe(map(({token}) => {
      let newToken = token || localStorage.getItem('TOKEN');
      if(newToken) {
        const { role, fullname } = jwt_decode(newToken) as User;
        if(role && fullname) {
          return { role, fullname };
        } else {
          return {role: '', fullname: ''}
        }
      } else {
        return {role: '', fullname: ''}
      }
    }));
  }

  logout() {
    this.userService.clearToken();
    this.store.dispatch(logout());
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {

  }

}
