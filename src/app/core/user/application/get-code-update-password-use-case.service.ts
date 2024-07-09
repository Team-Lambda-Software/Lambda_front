import { Observable, of } from "rxjs";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../common/helpers/Result";
import { IAuthRepository } from "../../shared/application/ports/IAuthRepository.interface";
import { IUserStatusProvider } from "../domain/interfaces/user-status-provider.interface";
import { IAuthApiComunication } from "../domain/interfaces/auth-api-comunication.interface";

export class GetCodeUpdatePasswordUseCase implements IUseCase<string,Observable<Result<string>>> {

  constructor(private _authRepository:IAuthRepository,
    private _authApiComunication:IAuthApiComunication) {}

  execute(email:string): Observable<Result<string>> {
    return this._authApiComunication.getCodeUpdatePassword(email).pipe(
      (observable)=>{
        observable.subscribe({
          next:(value)=>{
            if (!value.isError()) {
              this._authRepository.saveDateCode(value.getValue())
              this._authRepository.saveEmail(email)
            }
          }
        })
        return observable
      }
    )
  }
}
