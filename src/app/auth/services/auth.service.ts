import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from '../../../env/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Optional } from '../helpers/Optional';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interface';
import { UserState } from '../interfaces/user-state.interface';
import { UsersResponse } from '../interfaces/users-response.interface';
import { SignUpUser } from '../interfaces/signup-user.interface';
import { SignUpResponse } from '../interfaces/signup-response.interface';

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

  private setAuthtication(newUser:UserState):boolean{
    this._currentUser.set(newUser)
    this._authStatus.set(AuthStatus.authenticated)
    return true
  }

  private createUser(responseData:LoginResponse):UserState{
    const {token,...response}= responseData
    let newUser:UserState={
      ...response
    }
    return newUser
  }

  private saveLocalStorage(token:string){
    localStorage.setItem('token',token)
  }

  login(email:string,password:string):Observable<boolean>{

    const url=`${this.baseUrl}/auth/loginuser`
    const body={email,password}

    return this.http.post<LoginResponse>(url,body)
      .pipe(
        map((response)=>{
          let newUser=this.createUser(response);
          this.saveLocalStorage(response.token)
          return this.setAuthtication(newUser)
          // console.log(response);
        }),
        catchError(error=>{
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
    }
    signup(user:SignUpUser):Observable<boolean>{

      const url=`${this.baseUrl}/auth/signupuser`
      const body={...user,}

      return this.http.post<SignUpResponse>(url,body)
        .pipe(
          map((response)=>{
            let newUser=this.createUser(response);
            this.saveLocalStorage(response.token)
            return this.setAuthtication(newUser)
            // console.log(response);
          }),
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

    return of(true)
    // const headers= new HttpHeaders()
    //   .set(`Authorization`,`Bearer ${token}`);

    //     return this.http.get<UsersResponse>(url,{headers})
    //       .pipe(
    //         map((response)=>{
    //           let newUser=this.createUser(response);
    //           this.saveLocalStorage(response.token)
    //           return this.setAuthtication(newUser)
    //         }),

    //           catchError(()=>
    //             {
    //               this._authStatus.set(AuthStatus.notAuthenticated)
    //               return of(false)
    //             })
    //       )
  }
}
