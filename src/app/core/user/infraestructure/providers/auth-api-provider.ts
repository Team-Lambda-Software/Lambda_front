import { InjectionToken, Provider } from '@angular/core';
import { IAuthApiService } from '../../domain/interfaces/auth-api.interface';
import { AuthApiService } from '../services/auth-api.service';

export const HTTP_AUTH_SERVICE = new InjectionToken<IAuthApiService>('AuthApiService');

export const AUTH_API_PROVIDER: Provider = { provide: HTTP_AUTH_SERVICE, useClass: AuthApiService };
