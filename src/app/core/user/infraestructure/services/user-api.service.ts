import { inject, Injectable } from "@angular/core";
import { IUSerApiComunication } from "../../domain/interfaces/user-api-comunication.interface";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { UpdateUSerEntryApplicationDTO } from "../../application/entry/update-user-entry.dto";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from "../../../../../environments/environment";
import { UpdateUserResponse } from "../dto/response/updateUser-response.interface";
import { IAuthRepository } from "../../../shared/application/ports/IAuthRepository.interface";


export class UserApiService implements IUSerApiComunication {
  private _httpClient = inject(HttpClient);
  readonly BASE_URL:string= enviroment.baseUrl+`/user/update`
  constructor(private authRepository:IAuthRepository) {}

  updateUser(data: UpdateUSerEntryApplicationDTO): Observable<Result<string>> {
    const body={...data}
    console.log('peticion',data);
    let token=this.authRepository.getToken()
    if (!token.hasValue()) return of(Result.makeError<string>(new Error('Error No tiene Token')))

    const headers= new HttpHeaders()
    .set('Authorization',`Bearer ${token.getValue()}`)
    return this._httpClient.put<UpdateUserResponse>(this.BASE_URL,body,{headers})
      .pipe(
        map((response)=>{
          return Result.makeResult(response.id)
        }),
        catchError(error=>{
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )

  }
}
