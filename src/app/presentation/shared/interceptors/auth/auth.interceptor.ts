import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const _authRepository:AuthLocalStorageService= new AuthLocalStorageService()
  let authToken = null;
  const possibleToken = _authRepository.getToken();
  if (possibleToken.hasValue())
    authToken = possibleToken.getValue();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  //TODO QUITAR ESE INSTANCE OF ESO ES PENADO
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        router.navigate(['/auth']);
        _authRepository.deleteToken()
      }
      return throwError(() => err);
    }));
};
