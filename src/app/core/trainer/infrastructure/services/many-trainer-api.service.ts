import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { Trainer, TrainerComplete } from '../../domain/trainer.model';

@Injectable()
export class ManyTrainersApiService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/trainer'
  
  execute(): Observable<TrainerComplete[]> {
    return this._httpClient.get<TrainerComplete[]>(`${this.BASE_URL}/many?page=1&perPage=5`)
      .pipe( e => {
        return e
      });
  }

}