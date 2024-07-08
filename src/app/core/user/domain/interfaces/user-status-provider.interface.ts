import { Optional } from "../../../../common/helpers/Optional"
import { AppUser } from "../appuser"
import { AuthStatus } from "../enum/auth-status.enum"

export interface IUserStatusProvider{
  setChecking():void
  setNotAuthenticated():void
  setAuthenticated():void
  deleteUser():void
  setUser(user:AppUser):void
  currentStatus():AuthStatus
  currentUser():Optional<AppUser>;
  updateEmail(email:string):void
  updateName(name:string):void
  updateImage(image:string):void
  updatePhone(phone:string):void
}
