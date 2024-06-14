import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { ITrainerApiService } from '../../domain/interfaces/trainer-api.interface.';
import { Trainer } from '../../domain/trainer.model';

@Injectable()
export class TrainerApiService implements ITrainerApiService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/trainer'
  
  getById(id: string): Observable<Trainer> {
    throw new Error('Method not implemented.');
  }

}