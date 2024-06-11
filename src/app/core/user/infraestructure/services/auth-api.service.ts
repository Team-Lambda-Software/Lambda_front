import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../dto/response/login-response.interface';
import { LocalStorageService } from '../../../shared/infraestructure/local-storage/local-storage.service';
import { IAuthApiService } from '../../domain/interfaces/login-api.interface';
import { LoginUserData } from '../../../../presentation/auth/interfaces/login-auth.interface';
import { User } from '../../domain/user';
import { IRepository } from '../../../shared/application/ports/IRepository.interface';
import { Result } from '../../../helpers/Result';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthApiService {
  private _httpClient = inject(HttpClient);
  readonly BASE_URL:string= enviroment.baseUrl+`/auth/login`
  private _repository:IRepository= new LocalStorageService()

  constructor() {}

  login(loginUserData: LoginUserData): Observable<Result<User>> {
    const body={...loginUserData}
    return this._httpClient.post<LoginResponse>(this.BASE_URL,body)
      .pipe(
        map((loginData)=>{
          this._repository.saveByKeyValue('token',loginData.token)
          return Result.makeResult(new User(loginData.user))
        }),
        catchError(error=>{
          console.log(error);
          return throwError(()=>Result.makeError(error.error.message))
        })
      )
  }
}
