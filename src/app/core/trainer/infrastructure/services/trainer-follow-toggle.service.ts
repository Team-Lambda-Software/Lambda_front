import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { ITrainerFollowToggleService } from '../../domain/interfaces/trainer-follow-toggle.service';

export class TrainerFollowToggleService implements ITrainerFollowToggleService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/trainer/toggle/follow/'

  toggle(id: string): Observable<void> {
    return this._httpClient.post<void>(`${this.BASE_URL}${id}`, {})
  }

}
