import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../dto/response/login-response.interface';
import { LocalStorageService } from '../../../shared/infraestructure/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService implements LoginApiService {
  private _httpClient = inject(HttpClient);
  readonly BASE_URL:string= enviroment.baseUrl+`/auth/login`

  constructor() { }

  login(email:string,password:string):Observable<LoginResponse>{
    const body={email,password}
    return this._httpClient.post<LoginResponse>(this.BASE_URL,body)
      .pipe(
        catchError(error=>{
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
  }

}
