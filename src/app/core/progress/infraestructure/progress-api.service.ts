import { catchError, map, Observable, of, throwError } from "rxjs";
import { Result } from "../../../common/helpers/Result";
import { IProgressApiComunication } from "../application/interfaces/progress-api-comunication";
import { inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from "../../../../environments/environment";
import { IAuthRepository } from "../../shared/application/ports/IAuthRepository.interface";
import { ProgressTrendingResponse } from "./adapters/dto/ProgressTrendingResponse";
import { ProgressTrending } from "../application/interfaces/dto/progress-trending.interface";

export default class ProgressApiComunication implements IProgressApiComunication{

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/progress'
  constructor(private _authRepository:IAuthRepository){}

  getProgressTrending(): Observable<Result<ProgressTrending>> {
    const url=`${this.BASE_URL}/trending`
    let token=this._authRepository.getToken()
    if (!token.hasValue()) return of(Result.makeError<ProgressTrending>(new Error('Error No tiene Token')))

    const headers= new HttpHeaders()
    .set('Authorization',`Bearer ${token.getValue()}`)
    return this._httpClient.get<ProgressTrendingResponse>(url,{headers})
      .pipe(
        map((response)=>{
          return Result.makeResult({
            Percent: response.Percent,
            courseTitle: response.courseTitle,
            courseId: response.courseId,
            lastTime: response.lastTime
          })
        }),
        catchError(error=>{
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )
  }
}
