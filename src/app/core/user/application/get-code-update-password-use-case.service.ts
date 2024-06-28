import { Observable, of } from "rxjs";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../common/helpers/Result";
import { IAuthRepository } from "../../shared/application/ports/IAuthRepository.interface";
import { IUserStatusProvider } from "../domain/interfaces/user-status-provider.interface";
import { IAuthApiComunication } from "../domain/interfaces/auth-api-comunication.interface";

export class GetCodeUpdatePasswordUseCase implements IUseCase<string,Observable<Result<string>>> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:IUserStatusProvider,
    private _authApiComunication:IAuthApiComunication) {}

  execute(email:string): Observable<Result<string>> {
    this._userStatus.setChecking();
    return this._authApiComunication.getCodeUpdatePassword(email).pipe(
      (observable)=>{
        observable.subscribe({
          next:(value)=>{
            if (!value.isError()) {
              console.log(value.getValue());
              this._authRepository.saveDateCode(value.getValue())
              this._authRepository.saveEmail(email)
              if (this._authRepository.getCode().hasValue())
              console.log(this._authRepository.getCode().getValue());
              console.log(this._authRepository.getEmail().getValue());
            }
            this._userStatus.setNotAuthenticated()
          },
          error:(error:Result<Error>)=>{
            this._userStatus.setNotAuthenticated()
          }
        })
        return observable
      }
    )
  }
}
