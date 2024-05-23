import { Observable } from 'rxjs';
import { ITrainerUseCase } from '../domain/interfaces/trainer-use-case.interface';
import { Trainer } from '../domain/trainer.model';
import { ITrainerApiService } from '../domain/interfaces/trainer-api.interface.';

export class TrainerUseCaseService implements ITrainerUseCase {
	constructor(private _trainerApiService: ITrainerApiService) {}
  
  getById(id: string): Observable<Trainer> {
    return this._trainerApiService.getById(id);
  }

}