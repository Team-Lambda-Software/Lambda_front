import { LoginEntryDomainDTO  } from '../domain/interfaces/entry/login-entry.dto';
import { AppUser } from '../domain/appuser';

import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';
import { Result } from '../../../common/helpers/Result';

import { Observable} from 'rxjs';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { IAuthApiComunication } from '../domain/interfaces/auth-api-comunication.interface';
import { IUserStatusProvider } from '../domain/interfaces/user-status-provider.interface';


export class LoginUseCaseService implements IUseCase<LoginEntryDomainDTO,Observable<Result<string>>> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:IUserStatusProvider,
    private _authApiComunication:IAuthApiComunication) {}

  execute(data: LoginEntryDomainDTO): Observable<Result<string>> {
    this._userStatus.setChecking();
    return this._authApiComunication.login(data.email,data.password).pipe(
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
