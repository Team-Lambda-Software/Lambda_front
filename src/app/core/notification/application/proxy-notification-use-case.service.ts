import { Observable, of, tap } from 'rxjs';
import { Notification } from '../domain/notification.model';
import { INotificationUseCase } from '../domain/interfaces/notification-use-case.interface';
/*
export class ProxyNotificationUseCase implements INotificationUseCase {
  
  private cacheProxy = {
    getByParams: new Map<string, Observable<Notification[]>>(),
  }

  constructor(private _notificationUseCaseService: INotificationUseCase) { }

  getByParams(params?: string | undefined): Observable<Notification[]> {
    if ( this.cacheProxy.getByParams.has(params ?? 'noParamsProvided') ) return this.cacheProxy.getByParams.get(params ?? 'noParamsProvided')!
    else return this._notificationUseCaseService.getByParams(params)
                  .pipe(tap(c => {
                    this.cacheProxy.getByParams.set(params ?? 'noParamsProvided', of(c))
                  }));
  }
}*/
