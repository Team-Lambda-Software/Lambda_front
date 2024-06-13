import { InjectionToken, Provider } from '@angular/core';
import { INotificationApiService } from '../../domain/interfaces/notification-api.interface';
import { NotificationApiService } from '../services/notification-api.service';

export const HTTP_NOTIFICATION_SERVICE = new InjectionToken<INotificationApiService>('NotificationApiService');

export const NOTIFICATION_API_PROVIDER: Provider = { provide: HTTP_NOTIFICATION_SERVICE, useClass: NotificationApiService };