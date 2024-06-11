import { Observable} from "rxjs";
import { IAuthUseCase } from "../domain/interfaces/auth-use-case.interface";
import { LoginUserData } from "../infraestructure/dto/entry/login-auth.interface";
import { IAuthApiService } from "../domain/interfaces/login-api.interface";
import { User } from "../domain/user";
import { AuthStatus } from "../domain/interfaces/auth-status.enum";
import { Result } from "../../../common/helpers/Result";
import { Optional } from "../../../common/helpers/Optional";


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
    return this._loginApiService.login(loginData)
  }

}
