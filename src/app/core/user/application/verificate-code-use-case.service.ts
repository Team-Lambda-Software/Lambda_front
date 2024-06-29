import { Observable, of } from "rxjs";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../common/helpers/Result";
import { IAuthRepository } from "../../shared/application/ports/IAuthRepository.interface";
import { IUserStatusProvider } from "../domain/interfaces/user-status-provider.interface";
import { IAuthApiComunication } from "../domain/interfaces/auth-api-comunication.interface";

export class VerificateCodeUseCase implements IUseCase<string,Observable<Result<number>>> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:IUserStatusProvider,
    private _authApiComunication:IAuthApiComunication) {}

  execute(code:string): Observable<Result<number>> {
    this._userStatus.setChecking();
    let email= this._authRepository.getEmail();
    if (!email.hasValue()) return of(Result.makeError<number>(new Error('No se encuentra el email')))
    return this._authApiComunication.verificateCode(email.getValue(),code).pipe(
      (observable)=>{
        observable.subscribe({
          next:(value)=>{
            if (!value.isError()) this._authRepository.saveCode(code)
          }
        })
        this._userStatus.setNotAuthenticated();
        return observable
      }
    )
  }
}
