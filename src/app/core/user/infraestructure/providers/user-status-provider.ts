import { InjectionToken, Provider } from '@angular/core';
import { IUserStatusProvider } from '../../domain/interfaces/user-status-provider.interface';
import { UserStatusService } from '../services/user-status.service';

export const HTTP_USER_SERVICE = new InjectionToken<IUserStatusProvider>('UserStatusService');

export const USER_API_PROVIDER: Provider = { provide: HTTP_USER_SERVICE, useClass: UserStatusService };
