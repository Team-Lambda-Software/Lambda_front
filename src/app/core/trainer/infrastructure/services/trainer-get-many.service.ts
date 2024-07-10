import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { TrainerDetail } from '../../domain/trainer.model';
import { Result } from '../../../../common/helpers/Result';
import { TrainerResponse } from '../adapters/dtos/trainer.dto';
import { TrainerResponseToDetailTrainer } from '../adapters/converters/TrainerResponseToDetailTrainer';
import { ITrainerGetManyService } from '../../domain/interfaces/trainer-get-many.service';

export class TrainerGetManyService implements ITrainerGetManyService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/trainer/many'

  getMany(params: string): Observable<Result<TrainerDetail[]>> {
    return this._httpClient.get<TrainerResponse[]>(`${this.BASE_URL}${params}`)
      .pipe(
        map(response => Result.makeResult(response.map(TrainerResponseToDetailTrainer))),
        catchError(error => throwError(() => Result.makeError(new Error(error.error.message))))
      )
  }

}
