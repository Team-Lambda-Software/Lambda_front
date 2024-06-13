import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { IAuthRepository } from '../../../core/shared/application/ports/IRepository.interface';
import { LocalStorageService } from '../../../core/shared/infraestructure/local-storage/local-storage.service';

export const hasVerifiedCodeGuard: CanActivateFn = (route, state) => {

  const _authRepository:IAuthRepository= new LocalStorageService()
  const router = inject(Router);
  _authRepository.deleteDateCode()

  if(!_authRepository.getCode().hasValue()) {
    router.navigateByUrl('/auth/resetpassword')
    return false
  }
  return true
};
