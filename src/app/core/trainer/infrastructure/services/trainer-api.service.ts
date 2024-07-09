import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { Trainer } from '../../domain/trainer.model';
import { ITrainerApiComunication } from '../../domain/interfaces/trainer-api-comunication';
import { Result } from '../../../../common/helpers/Result';
import { UserFollowResponse } from '../adapters/dtos/UserFollow.dto';
import { IAuthRepository } from '../../../shared/application/ports/IAuthRepository.interface';

export class TrainerApiService implements ITrainerApiComunication {


  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/trainer'

  constructor(private _authRepository:IAuthRepository){}
  getById(id: string): Observable<Trainer> {
    throw new Error('Method not implemented.');
  }

  getUserFollow(): Observable<Result<number>> {
    const url=`${this.BASE_URL}/user/follow`
    let token=this._authRepository.getToken()
    if (!token.hasValue()) return of(Result.makeError<number>(new Error('Error No tiene Token')))

    const headers= new HttpHeaders()
    .set('Authorization',`Bearer ${token.getValue()}`)
    return this._httpClient.get<UserFollowResponse>(url,{headers})
      .pipe(
        map((response)=>{
          return Result.makeResult(response.count)
        }),
        catchError(error=>{
          return throwError(()=>Result.makeError(new Error(error.error.message)))
        })
      )
  }

}
