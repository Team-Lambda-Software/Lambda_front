import { AuthStatus } from '../../domain/interfaces/auth-status.enum';
import { AppUser } from '../../domain/appuser';
import { IUserStatusProvider } from '../../domain/interfaces/user-status-provider.interface';

import { Optional } from '../../../../common/helpers/Optional';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserStatusService implements IUserStatusProvider{
  private _user=new Optional<AppUser>(null)
  private _authStatus:AuthStatus=AuthStatus.notAuthenticated;

  setChecking():void{
    this._authStatus=AuthStatus.checking
  }

  setNotAuthenticated():void{
    this._authStatus=AuthStatus.notAuthenticated
  }

  setAuthenticated():void{
    this._authStatus=AuthStatus.authenticated
  }

  deleteUser():void{this._user=new Optional<AppUser>(null)
  }

  setUser(user:AppUser){
    this.setAuthenticated()
   this._user=new Optional(user)
  }

  currentStatus():AuthStatus{ return this._authStatus}

  currentUser():Optional<AppUser>{return this._user}

  constructor() { }

}
