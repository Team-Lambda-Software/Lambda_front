import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../../../core/user/domain/interfaces/auth-status.enum';
import { enviroment } from '../../../../environments/environment';


export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService=inject(AuthService)
  const router = inject(Router);
  // if (!enviroment.production) {
  //   return true
  // }
  console.log(authService.authStatus());


  if(authService.authStatus()=== AuthStatus.authenticated){
    router.navigateByUrl('/home/main')
    return false
  }
  else{
    return true;
  }
};
