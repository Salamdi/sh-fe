import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { API_ENDPOINT } from '../environments/environment';

const SIGNUP_URL = '/rest/register';
const LOGIN_URL = '/rest/login';
const VALIDATE_URL = '/rest/validate';

export interface SignupModel {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface AuthModel {
  token: string;
  user: UserModel;
}

export interface UserModel {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public token: string;
  public user: UserModel;
  private validToken: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    const auth: AuthModel = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      this.token = auth.token;
      this.user = auth.user;
    }
  }

  signup(user: SignupModel): void {
    this.http
      .post<AuthModel>(`${API_ENDPOINT}${SIGNUP_URL}`, user)
      .subscribe(
        this.handleSuccess,
        (err) => console.error(err)
      );
  }

  login(user: LoginModel): void {
    this.http
      .post<AuthModel>(`${API_ENDPOINT}${LOGIN_URL}`, user)
      .subscribe(
        this.handleSuccess,
        (err) => {
          console.error(err);
          alert(err.error.msg);
        }
      )
  }

  validate(token: string): Observable<boolean | UrlTree> {
    return this.http
      .post<{ isvalid: boolean }>(`${API_ENDPOINT}${VALIDATE_URL}`, { token })
      .pipe(
        map(({ isvalid }) => {
          this.validToken = isvalid;
          return this.validToken;
        }),
        catchError(() => of(this.router.parseUrl('public')))
      )
  }

  handleSuccess = (response: AuthModel): void => {
    localStorage.setItem('auth', JSON.stringify(response));
    this.token = response.token;
    this.user = response.user;
    this.validToken = true;
    this.router.navigateByUrl('private');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    if (this.token && state.url.includes('private')) {
      return this.validate(this.token);
    }
    if (state.url.includes('public')) {
      return this.token
        ? this.validate(this.token)
          .pipe(map((isvalid) => isvalid ? this.router.parseUrl('private') : isvalid))
        : of(true);
    }
    return of(this.validToken || this.router.parseUrl('public'));
  }
}
