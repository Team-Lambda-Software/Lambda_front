import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../../../core/user/domain/enum/auth-status.enum';
import { UserStatusService } from '../../../core/user/infraestructure/services/user-status.service';
import { UserType } from '../../../core/user/domain/enum/Usertype.interface';

export const isAuthenticatedAdminGuard: CanActivateFn = (route, state) => {
  const userStatus=inject(UserStatusService)
  const router = inject(Router);
  let user=userStatus.currentUser()
  if (!user.hasValue()) return false
  let userType=user.getValue().type
  if(userStatus.currentStatus()===AuthStatus.authenticated && userType===UserType.ADMIN) return true
  else{
    router.navigateByUrl('/auth/home')
    return false;
  }
};
