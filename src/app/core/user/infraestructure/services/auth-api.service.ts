import { UserType } from '../../domain/interfaces/Usertype.interface';
import { AppUser } from '../../domain/appuser';

import { LoginResponse } from '../dto/response/login-response.interface';
import { SignUpResponse } from '../dto/response/signup-response.interface';
import { User } from '../dto/response/user-response.interface';

import { enviroment } from '../../../../../environments/environment';
import { Result } from '../../../../common/helpers/Result';

import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { Injectable, Optional, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { GetCodeResponse } from '../dto/response/getCode-response.interface';
import { UserStatusService } from './user-status.service';
import { IAuthApiComunication } from '../../domain/interfaces/auth-api-comunication.interface';
import { IUserStatusProvider } from '../../domain/interfaces/user-status-provider.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthApiService implements IAuthApiComunication {
  private _httpClient = inject(HttpClient);
  readonly BASE_URL:string= enviroment.baseUrl+`/auth`
  private _userState:IUserStatusProvider=new UserStatusService()
  constructor() {}

  login(email:string,password:string): Observable<Result<string>> {
    const body={email:email,password:password}
    const url=`${this.BASE_URL}/login`
    return this._httpClient.post<LoginResponse>(url,body)
      .pipe(
        map((response)=>{
          // this._authRepository.saveToken(response.token)
          let type:UserType=UserType.CLIENT
          if(response.type===UserType.CLIENT) type=UserType.CLIENT
          if(response.type===UserType.ADMIN) type=UserType.ADMIN
          this._userState.setUser(new AppUser({...response.user,type}))
          return Result.makeResult(response.token)
        }),
        catchError(error=>{
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )
  }

  currentUser(token:string): Observable<Result<AppUser>> {
    const url=`${this.BASE_URL}/current`

    const headers= new HttpHeaders()
    .set('Authorization',`Bearer ${token}`)

    return this._httpClient.get<User>(url,{headers})
      .pipe(
        map((response)=>{
          let type= UserType.CLIENT
          return Result.makeResult(new AppUser({...response,type}))
        }),
        catchError(error=>{
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )
    }

    signup(email: string,name: string, password: string, phone: string, type: UserType): Observable<Result<string>> {
      const url=`${this.BASE_URL}/register`
      const body={email,name,password,phone,type}

      return this._httpClient.post<SignUpResponse>(url,body)
        .pipe(
          switchMap((response)=>{
            let answer=this.login(email,password)
            return answer
          }),
          catchError(error=>{
            return throwError(()=>Result.makeError(new Error(error.error.message)))
          })
        )
    }

    getCodeUpdatePassword(email:string):Observable<void>{
      const url=`${this.BASE_URL}/forget/password`;
      const body={email}
      return this._httpClient.post<GetCodeResponse>(url,body)
      .pipe(
        map((response)=>{
          // this._authRepository.saveEmail(email)
          // this._authRepository.saveDateCode(response.date.toString())
          return
        }),
        catchError(error=>{
          return throwError(()=>error.error.message)
        })
      )
    }


  verificateCode(email:string,code:string):Observable<number>{
    // let email=this._authRepository.getEmail()
    const url=`${this.BASE_URL}/code/validate`
    const body={email,code}

    return this._httpClient.post<HttpResponseBase>(url,body,{ observe: 'response' })
      .pipe(
        map((response)=>{
          // this._authRepository.saveCode(code)
          return response.status
        }),
        catchError(error=>{
          return throwError(()=>error.error.message)
        })
      )
  }

    updatePassword(email:string,code:string,password:string):Observable<number>{
      const url=`${this.BASE_URL}/change/password`
      const body={
        email:email,
        password:password,
        code:code
      }
      return this._httpClient.put<HttpResponseBase>(url,body,{ observe: 'response' })
        .pipe(
          map((response)=>{
            return response.status
          }),
          catchError(error=>{
            return throwError(()=>error.error.message)
          })
        )
      }

      // logout (): void {
      //   this._authRepository.deleteToken();
      // }
}
