import { AuthStatus } from '../../domain/enum/auth-status.enum';
import { AppUser } from '../../domain/appuser';
import { IUserStatusProvider } from '../../domain/interfaces/user-status-provider.interface';

import { AuthLoadingStore } from '../auth-loading-store';
import { UserStore } from '../user-store';

import { Optional } from '../../../../common/helpers/Optional';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UserStatusService implements IUserStatusProvider{

  setChecking():void{
    const _status=AuthLoadingStore.getInstance();
    _status.store(AuthStatus.checking)
  }

  setNotAuthenticated():void{
    const _status=AuthLoadingStore.getInstance();
    _status.store(AuthStatus.notAuthenticated)
  }

  setAuthenticated():void{
    const _status=AuthLoadingStore.getInstance();
    _status.store(AuthStatus.authenticated)
  }

  deleteUser():void{
    const _user=UserStore.getInstance();
    _user.store(new Optional<AppUser>(null))
  }

  setUser(user:AppUser){
    this.setAuthenticated()
    const _user=UserStore.getInstance();
    _user.store(new Optional<AppUser>(user))
  }

  currentStatus():AuthStatus{
    const _status=AuthLoadingStore.getInstance();
    return _status.get()}

  currentUser():Optional<AppUser>{
    const _user=UserStore.getInstance();
    return _user.get()
  }

  constructor(){}
}
