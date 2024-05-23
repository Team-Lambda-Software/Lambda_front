import { InjectionToken, Provider } from '@angular/core';
import { TrainerApiService } from '../services/trainer-api.service';
import { ITrainerApiService } from '../../domain/interfaces/trainer-api.interface.';

export const HTTP_TRAINER_SERVICE = new InjectionToken<ITrainerApiService>('TrainerApiService');

export const TRAINER_API_PROVIDER: Provider = { provide: HTTP_TRAINER_SERVICE, useClass: TrainerApiService };