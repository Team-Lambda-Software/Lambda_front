import { Injectable } from '@angular/core';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { Observable } from 'rxjs';
import { Result } from '../../../common/helpers/Result';
import { IProgressApiComunication } from './interfaces/progress-api-comunication';
import { ProgressTrending } from './interfaces/dto/progress-trending.interface';

export class ProgressTrendingUseCaseService implements IUseCase<void,Observable<Result<ProgressTrending>>>{

  constructor(private _progressApiComunication:IProgressApiComunication) { }
  execute(data: void): Observable<Result<ProgressTrending>> {
    return this._progressApiComunication.getProgressTrending()
  }

}
