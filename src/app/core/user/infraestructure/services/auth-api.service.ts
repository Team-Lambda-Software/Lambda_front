import { IAuthApiService } from '../../domain/interfaces/login-api.interface';
import { LoginEntryDomainDTO  } from '../../domain/interfaces/entry/login-entry.dto';
import { SignUpEntryDomainDTO } from '../../domain/interfaces/entry/signup-entry.dto';
import { Type } from '../../domain/interfaces/type.interface';
import { AppUser } from '../../domain/appuser';


import { UserStatusService } from '../../application/user-status.service';


import { LoginResponse } from '../dto/response/login-response.interface';
import { SignUpResponse } from '../dto/response/signup-response.interface';
import { User } from '../dto/response/user-response.interface';

import { LocalStorageService } from '../../../shared/infraestructure/local-storage/local-storage.service';
import { enviroment } from '../../../../../environments/environment';
import { IAuthRepository } from '../../../shared/application/ports/IRepository.interface';
import { Result } from '../../../../common/helpers/Result';


import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetCodeResponse } from '../dto/response/getCode-response.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthApiService implements IAuthApiService {
  private _httpClient = inject(HttpClient);
  readonly BASE_URL:string= enviroment.baseUrl+`/auth`
  private _authRepository:IAuthRepository= new LocalStorageService()
  private _userStatus:UserStatusService = new UserStatusService()

  constructor() {}

  login(LoginEntryDomainDTO: LoginEntryDomainDTO): Observable<Result<AppUser>> {
    const body={...LoginEntryDomainDTO}
    const url=`${this.BASE_URL}/login`
    this._userStatus.setChecking()
    return this._httpClient.post<LoginResponse>(url,body)
      .pipe(
        map((response)=>{
          this._authRepository.saveToken(response.token)
          this._userStatus.setAuthenticated()
          let type:Type=Type.CLIENT
          if(response.type===Type.CLIENT) type=Type.CLIENT
          if(response.type===Type.ADMIN) type=Type.ADMIN
          return Result.makeResult(new AppUser({...response.user,type}))
        }),
        catchError(error=>{
          this._userStatus.setNotAuthenticated()
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )
  }

  currentUser(): Observable<Result<AppUser>> {
    const url=`${this.BASE_URL}/current`
    const token=this._authRepository.getToken()

    if( !token.hasValue()) return of ()

    const headers= new HttpHeaders()
    .set('Authorization',`Bearer ${token.getValue()}`)
    this._userStatus.setChecking()


    return this._httpClient.get<User>(url,{headers})
      .pipe(
        map((response)=>{
          let type= Type.CLIENT
          this._userStatus.setAuthenticated()
          return Result.makeResult(new AppUser({...response,type}))
        }),
        catchError(error=>{
          this._userStatus.setNotAuthenticated()
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )
    }

    signup(user: SignUpEntryDomainDTO): Observable<Result<AppUser>> {
      const url=`${this.BASE_URL}/register`
      const body={...user}
      this._userStatus.setChecking()

      return this._httpClient.post<SignUpResponse>(url,body)
        .pipe(
          switchMap((response)=>{
            this._userStatus.setAuthenticated()
            let answer=this.login({email:user.email,password:user.password})
            return answer
          }),
          catchError(error=>{
            this._userStatus.setNotAuthenticated()
            return throwError(()=>Result.makeError(new Error(error.error.message)))
          })
        )
    }

    getCodeUpdatePassword(email:string):Observable<void>{
      const url=`${this.BASE_URL}/forget/password`;
      const body={email}
      this._userStatus.setChecking()
      return this._httpClient.post<GetCodeResponse>(url,body)
      .pipe(
        map((response)=>{
          this._userStatus.setNotAuthenticated()
          return
        }),
        catchError(error=>{
          this._userStatus.setNotAuthenticated()
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
    }

}
