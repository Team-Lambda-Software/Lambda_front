import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { INotificationApiService } from '../../domain/interfaces/notification-api.interface';
import { enviroment } from '../../../../../environments/environment';
import { Notification } from '../../domain/notification.model';
import { NotificationTokenResponse, NotificationResponse, NotificationCountResponse } from '../adapters/dtos/notification.dto';
import { NotificationResponseToNotification, NotificationTokenResponseToNotificationToken } from '../adapters/converters/NotificationResponseToNotification';
import { Optional } from '../../../../common/helpers/Optional';

@Injectable()
export class NotificationApiService implements INotificationApiService {
  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/notifications';
  public APItoken: Optional<string>=new Optional()

  getNotificationByParams(params: string): Observable<Notification[]> {
    return this._httpClient.get<NotificationResponse[]>(`${this.BASE_URL}/many${params}`)
    .pipe(
      map((responses: NotificationResponse[]) => {
        return responses.map(NotificationResponseToNotification);
      })
    );

  }
  
  getNotificationCountNotRead(): Observable<number>{
    return this._httpClient.get<NotificationCountResponse>(`${this.BASE_URL}/count/not-readed`)
    .pipe(
      map((response)=>{
        const count = response.count; 
        return count;
      }),
      catchError(error=> {
        return throwError(()=>error.error.message)
      })
    )
  }

  getNotificationById(id: string): Observable<Notification> {
    return this._httpClient.get<NotificationResponse>(`${this.BASE_URL}/one/${id}`)
      .pipe(map(NotificationResponseToNotification))
  };

  deleteAllNotifications(): Observable<void> {
    return this._httpClient.delete<void>(`${this.BASE_URL}/delete/all`);
  }

}