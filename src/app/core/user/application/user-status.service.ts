import { Injectable } from '@angular/core';
import { AuthStatus } from '../domain/interfaces/auth-status.enum';
import { AppUser } from '../domain/appuser';
import { Optional } from '../../../common/helpers/Optional';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  private _user=new Optional<AppUser>(null)
  private _authStatus:AuthStatus=AuthStatus.notAuthenticated;

  setChecking():void{
    console.log('checking');

    this._authStatus=AuthStatus.checking
  }

  setNotAuthenticated():void{
    this._authStatus=AuthStatus.notAuthenticated
  }

  setAuthenticated():void{

    this._authStatus=AuthStatus.authenticated
  }

  setUser(user:AppUser){console.log('pepe');
   this._user=new Optional(user)}

  currentStatus():AuthStatus{ return this._authStatus}

  currentUser():Optional<AppUser>{return this._user}

  constructor() { }

}
