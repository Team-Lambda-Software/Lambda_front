import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  let authToken = null;
  const possibleToken = LocalStorageService.get('token');
  if (possibleToken.hasValue())
    authToken = possibleToken.getValue();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        router.navigate(['/auth']);
        LocalStorageService.delete('token');
      }
      return throwError(() => err);
    }));
};