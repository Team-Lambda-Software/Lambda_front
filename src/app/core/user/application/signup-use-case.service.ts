import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';
import { Result } from '../../../common/helpers/Result';

import { Observable} from 'rxjs';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { IAuthApiComunication } from '../domain/interfaces/auth-api-comunication.interface';
import { SignUpEntryApplicationDTO } from './entry/signup-entry.dto';
import { IUserStatusProvider } from '../domain/interfaces/user-status-provider.interface';


export class SignUpUseCaseService implements IUseCase<SignUpEntryApplicationDTO,Observable<Result<string>>> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:IUserStatusProvider,
    private _authApiComunication:IAuthApiComunication) {}

  execute(data:SignUpEntryApplicationDTO): Observable<Result<string>> {
    this._userStatus.setChecking();
    return this._authApiComunication.signup(data.email,data.name,data.password,data.phone,data.type).pipe(
      (observable)=>{
        observable.subscribe({
          next:(value)=>{
            if (!value.isError()) this._authRepository.saveToken(value.getValue())
            else this._userStatus.setNotAuthenticated()
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
