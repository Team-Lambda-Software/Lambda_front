import { Observable } from "rxjs";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../common/helpers/Result";
import { IUserStatusProvider } from "../domain/interfaces/user-status-provider.interface";
import { UpdateUSerEntryApplicationDTO } from "./entry/update-user-entry.dto";
import { IUSerApiComunication } from "../domain/interfaces/user-api-comunication.interface";
import { IAuthRepository } from "../../shared/application/ports/IAuthRepository.interface";

export class UpdateUserUseCase implements IUseCase<UpdateUSerEntryApplicationDTO,Observable<Result<string>>> {

  constructor( private _userStatus:IUserStatusProvider,
    private _authApiComunication:IUSerApiComunication, private _AuthRepository:IAuthRepository) {}

  execute(data:UpdateUSerEntryApplicationDTO): Observable<Result<string>> {
    this._userStatus.setChecking();
    console.log(data);

    return this._authApiComunication.updateUser(data).pipe(
      (observable)=>{
        observable.subscribe({
          next:(value)=>{
            if(data.email) this._userStatus.updateEmail(data.email)
            if(data.image) this._userStatus.updateImage(data.image)
            if(data.name) this._userStatus.updateName(data.name)
            if(data.phone) this._userStatus.updatePhone(data.phone)
          },
          error:(error:Result<Error>)=>{
          }
        })
        this._userStatus.setNotAuthenticated()
        return observable
      }
    )
  }
}
