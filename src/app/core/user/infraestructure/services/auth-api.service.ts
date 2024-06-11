import { Observable, catchError, map, throwError } from 'rxjs';

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { enviroment } from '../../../../../environments/environment';
import { IAuthApiService } from '../../domain/interfaces/login-api.interface';
import { IAuthRepository } from '../../../shared/application/ports/IRepository.interface';
import { LocalStorageService } from '../../../shared/infraestructure/local-storage/local-storage.service';
import { LoginResponse } from '../dto/response/login-response.interface';
import { LoginUserData } from '../dto/entry/login-auth.interface';
import { Result } from '../../../../common/helpers/Result';
import { User } from '../../domain/user';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthApiService {
  private _httpClient = inject(HttpClient);
  readonly BASE_URL:string= enviroment.baseUrl+`/auth`
  private _repository:IAuthRepository= new LocalStorageService()

  constructor() {}

  login(loginUserData: LoginUserData): Observable<Result<User>> {
    const body={...loginUserData}
    const url=this.BASE_URL+'/login'
    return this._httpClient.post<LoginResponse>(url,body)
      .pipe(
        map((loginData)=>{
          this._repository.saveToken(loginData.token)
          return Result.makeResult(new User(loginData.user))
        }),
        catchError(error=>{
          console.log('error:',error);
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )
  }
}
