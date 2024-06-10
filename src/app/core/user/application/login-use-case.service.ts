import { Observable } from "rxjs";
import { Result } from "../../helpers/Result";
import { ILoginUseCase } from "../domain/interfaces/login-use-case.interface";
import { LoginResponse } from "../infraestructure/dto/response/login-response.interface";
import { ILoginApiService } from "../domain/interfaces/login-api.interface";


export class LoginUseCaseService implements ILoginUseCase {

  constructor(private _loginApiService: ILoginApiService) { }

  login(email: string, password: string): Result<Observable<LoginResponse>> {
    let ans=this._loginApiService.login(email,password)
    return(Result.makeResult(ans))
  }

}
