import { Observable } from 'rxjs';
import { INotificationApiService } from '../domain/interfaces/notification-api.interface';
import { INotificationUseCase } from '../domain/interfaces/notification-use-case.interface';
import { Notification } from '../domain/notification.model';

export class NotificationUseCaseService implements INotificationUseCase {
	constructor(private _notificationApiService: INotificationApiService) {}

   	getNotificationByParams(params: string): Observable<Notification[]> {
		return this._notificationApiService.getNotificationByParams(params);
	}

}