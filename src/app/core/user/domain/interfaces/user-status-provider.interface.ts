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
  currentUser():Optional<AppUser>
}
