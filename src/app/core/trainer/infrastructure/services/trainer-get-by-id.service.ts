import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { TrainerDetail } from '../../domain/trainer.model';
import { Result } from '../../../../common/helpers/Result';
import { ITrainerGetByIdService } from '../../domain/interfaces/usecases/trainer-get-by-id.service';
import { TrainerResponse } from '../adapters/dtos/trainer.dto';
import { TrainerResponseToDetailTrainer } from '../adapters/converters/TrainerResponseToDetailTrainer';

export class TrainerGetByIdService implements ITrainerGetByIdService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/trainer/one/'

  getById(id: string): Observable<Result<TrainerDetail>> {
    return this._httpClient.get<TrainerResponse>(`${this.BASE_URL}${id}`)
      .pipe(
        map(response => Result.makeResult(TrainerResponseToDetailTrainer(response))),
        catchError(error => throwError(() => Result.makeError(new Error(error.error.message))))
      )
  }

}
