import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../../../core/user/domain/interfaces/auth-status.enum';
import { UserStatusService } from '../../../core/user/infraestructure/services/user-status.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userStatus=inject(UserStatusService)
  const router = inject(Router);

  if(userStatus.currentStatus()=== AuthStatus.authenticated) return true
  else{
    router.navigateByUrl('/auth/home')
    return false;
  }
};
