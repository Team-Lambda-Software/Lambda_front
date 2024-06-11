import { Observable} from "rxjs";
import { IAuthUseCase } from "../domain/interfaces/auth-use-case.interface";
import { LoginUserData } from "../../../presentation/auth/interfaces/login-auth.interface";
import { IAuthApiService } from "../domain/interfaces/login-api.interface";
import { User } from "../domain/user";
import { AuthStatus } from "../domain/interfaces/auth-status.enum";
import { IUser } from "../domain/user.model";
import { Optional } from "../../../presentation/shared/helpers/Optional";
import { Result } from "../../helpers/Result";


export class AuthUseCaseService implements IAuthUseCase {

  private _user= new Optional<User>(null)

  private _authStatus:AuthStatus=AuthStatus.notAuthenticated;

  private setChecking():void{
    this._authStatus=AuthStatus.checking
  }

  private setAuthenticaded():void{
    this._authStatus=AuthStatus.authenticated
  }
  private setNotAuthenticated():void{
    this._authStatus=AuthStatus.notAuthenticated
  }

  constructor(private _loginApiService: IAuthApiService) { }

  login(loginData:LoginUserData): Observable<Result<User>> {
    this.setChecking()
    console.log('checik hexagonal');

    return this._loginApiService.login(loginData)
  }

}
