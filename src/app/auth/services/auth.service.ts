import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from '../../../env/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Optional } from '../helpers/Optional';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interface';
import { UserState } from '../interfaces/user-state.interface';
import { UsersResponse } from '../interfaces/users-response.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly baseUrl:string= enviroment.baseUrl
  private http= inject(HttpClient)
  private _currentUser=signal <UserState |null>(null)
  private _authStatus= signal<AuthStatus>(AuthStatus.notAuthenticated);

  public currentUser=computed(()=>this._currentUser)
  public authStatus=computed(()=>this._authStatus())
  constructor() { }

  login(email:string,password:string):Observable<boolean>{

    const url=`${this.baseUrl}/auth/login`
    const body={email,password}

    return this.http.post<LoginResponse>(url,body)
      .pipe(
        tap((response)=>{
          let newUser:UserState={
            username:response.username,
            password:response.password,
            email:response.email
          }
          this._currentUser.set(newUser)
          this._authStatus.set(AuthStatus.authenticated)
          localStorage.setItem('token',response.token)
          // console.log(response);
        }),
        map(()=>true),

        catchError(error=>{
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
    }
  checkAuthStatus():Observable<boolean>{

    const url=`${this.baseUrl}/auth/check-token`;
    const token=localStorage.getItem('token');

    if (!token) return of(false);

    const headers= new HttpHeaders()
      .set(`Authorization`,`Bearer ${token}`);

        return this.http.get<UsersResponse>(url,{headers})
          .pipe(
            map((response)=>{
              let newUser:UserState={
                username:response.username,
                password:response.password,
                email:response.email
              }
              this._currentUser.set(newUser)
              this._authStatus.set(AuthStatus.authenticated)
              // localStorage.setItem('token',response.token)
              // console.log(response);
              return true
            }),

              catchError(()=>
                {
                  this._authStatus.set(AuthStatus.notAuthenticated)
                  return of(false)
                })
          )


    // const headers = new HttpHeaders()
  }
}
