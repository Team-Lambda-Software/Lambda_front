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
  updateEmail(email: string): void {
    let user=this.currentUser()
    if(user.hasValue()){
      let userData=user.getValue()
      let {id,name,phone,image,type}=userData
      this.setUser({id,email,name,phone,image,type})
    }
  }
  updateName(name: string): void {
    let user=this.currentUser()
    if(user.hasValue()){
      let userData=user.getValue()
      let {id,email,phone,image,type}=userData
      this.setUser({id,email,name,phone,image,type})
    }
  }
  updateImage(image: string): void {
    let user=this.currentUser()
    if(user.hasValue()){
      let userData=user.getValue()
      let {id,email,name,phone,type}=userData

      const base64='data:image/png;base64,'
      image=base64.concat(image)
      this.setUser({id,email,name,phone,image,type})
    }
  }
  updatePhone(phone: string): void {
    let user=this.currentUser()
    if(user.hasValue()){
      let userData=user.getValue()
      let {id,name,email,image,type}=userData
      this.setUser({id,email,name,phone,image,type})
    }
  }
}
