import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { Trainer } from '../../domain/trainer.model';
import { Result } from '../../../../common/helpers/Result';
import { IAuthRepository } from '../../../shared/application/ports/IAuthRepository.interface';
import { UserFollowResponse } from '../adapters/dtos/userFollow.dto';
import { ITrainerUserFollowService } from '../../domain/interfaces/usecases/trainer-user-follow.service';

export class TrainerUserFollowService implements ITrainerUserFollowService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/trainer'

  constructor(private _authRepository: IAuthRepository) { }

  getUserFollow(): Observable<Result<number>> {
    const url = `${this.BASE_URL}/user/follow`
    let token = this._authRepository.getToken()
    if (!token.hasValue()) return of(Result.makeError<number>(new Error('Usuario no autenticado...')))

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token.getValue()}`)
    return this._httpClient.get<UserFollowResponse>(url, { headers })
      .pipe(
        map((response) => {
          return Result.makeResult(response.count)
        }),
        catchError(error => {
          return throwError(() => Result.makeError(new Error(error.error.message)))
        })
      )
  }

}
