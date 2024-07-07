import { inject, Injectable } from "@angular/core";
import { IUSerApiComunication } from "../../domain/interfaces/user-api-comunication.interface";
import { catchError, map, Observable, throwError } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { UpdateUSerEntryApplicationDTO } from "../../application/entry/update-user-entry.dto";
import { HttpClient } from "@angular/common/http";
import { enviroment } from "../../../../../environments/environment";
import { UpdateUserResponse } from "../dto/response/updateUser-response.interface";

@Injectable({
  providedIn: 'root'
})

export class UserApiService implements IUSerApiComunication {
  private _httpClient = inject(HttpClient);
  readonly BASE_URL:string= enviroment.baseUrl+`/user/update`
  constructor() {}

  updateUser(data: UpdateUSerEntryApplicationDTO): Observable<Result<string>> {
    const body={...data}
    return this._httpClient.patch<UpdateUserResponse>(this.BASE_URL,body)
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
