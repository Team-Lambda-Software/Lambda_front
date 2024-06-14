import { Observable} from "rxjs";
import { IAuthUseCase } from "../domain/interfaces/auth-use-case.interface";
import { IAuthApiService } from "../domain/interfaces/auth-api.interface";
import { AppUser } from "../domain/appuser";

import { LoginEntryDomainDTO } from "../domain/interfaces/entry/login-entry.dto";
import { SignUpEntryDomainDTO } from "../domain/interfaces/entry/signup-entry.dto";


import { Result } from "../../../common/helpers/Result";


export class AuthUseCaseService implements IAuthUseCase {

  constructor(private _loginApiService: IAuthApiService) { }

  currentUser(): Observable<Result<AppUser>> {
    return this._loginApiService.currentUser()
  }

  login(loginData:LoginEntryDomainDTO): Observable<Result<AppUser>> {
    return this._loginApiService.login(loginData)
  }

  signup(user: SignUpEntryDomainDTO): Observable<Result<AppUser>>{
    return this._loginApiService.signup(user)
  }

  getCodeUpdatePassword(email:string):Observable<void>{
    return this._loginApiService.getCodeUpdatePassword(email)
  }

  verificateCode(code:string):Observable<number>{
    return this._loginApiService.verificateCode(code)
  }

  updatePassword(password:string):Observable<Number>{
    return this._loginApiService.updatePassword(password)
  }

  logout (): void {
    this._loginApiService.logout()
  }

}
