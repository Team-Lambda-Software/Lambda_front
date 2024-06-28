import { LoginEntryDomainDTO  } from '../domain/interfaces/entry/login-entry.dto';
import { AppUser } from '../domain/appuser';

import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';
import { Result } from '../../../common/helpers/Result';

import { Observable, of } from 'rxjs';
import { UserStatusService } from '../infraestructure/services/user-status.service';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { IAuthApiComunication } from '../domain/interfaces/auth-api-comunication.interface';
import { SignUpEntryDomainDTO } from '../domain/interfaces/entry/signup-entry.dto';


export class SingUpUseCaseService implements IUseCase<SignUpEntryDomainDTO,Observable<Result<string>>> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:UserStatusService,
    private _authApiComunication:IAuthApiComunication) {}

  execute(data:SignUpEntryDomainDTO): Observable<Result<string>> {
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
