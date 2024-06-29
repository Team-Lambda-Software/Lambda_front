import { Observable, of } from "rxjs";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../common/helpers/Result";
import { IAuthRepository } from "../../shared/application/ports/IAuthRepository.interface";
import { IUserStatusProvider } from "../domain/interfaces/user-status-provider.interface";
import { IAuthApiComunication } from "../domain/interfaces/auth-api-comunication.interface";

export class UpdatePasswordUseCase implements IUseCase<string,Observable<Result<number>>> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:IUserStatusProvider,
    private _authApiComunication:IAuthApiComunication) {}

  execute(password:string): Observable<Result<number>> {
    this._userStatus.setChecking();
    let email= this._authRepository.getEmail();
    let code= this._authRepository.getCode();
    if (!email.hasValue()) return of(Result.makeError<number>(new Error('No se encuentra el email')));
    if (!code.hasValue()) return of(Result.makeError<number>(new Error('No se encuentra el codigo')));
    return this._authApiComunication.updatePassword(email.getValue(),code.getValue(),password).pipe(
      (observable)=>{
        observable.subscribe()
        this._userStatus.setNotAuthenticated();
        return observable
      }
    )
  }
}
