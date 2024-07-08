import { AppUser } from '../domain/appuser';

import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';
import { Result } from '../../../common/helpers/Result';

import { Observable, of } from 'rxjs';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { IAuthApiComunication } from '../domain/interfaces/auth-api-comunication.interface';
import { SignUpEntryApplicationDTO } from './entry/signup-entry.dto';
import { IUserStatusProvider } from '../domain/interfaces/user-status-provider.interface';


export class CurrentUserUseCaseService implements IUseCase<SignUpEntryApplicationDTO,Observable<Result<AppUser>>> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:IUserStatusProvider,
    private _authApiComunication:IAuthApiComunication) {}

  execute(): Observable<Result<AppUser>> {
    this._userStatus.setChecking();
    const token=this._authRepository.getToken();
    if (!token.hasValue()) { this._userStatus.setNotAuthenticated()
      // return of(Result.makeError<AppUser>(new Error('Token no registrado')));
      return of ()

    }
    return this._authApiComunication.currentUser(token.getValue()).pipe(
      (observable)=>{
        observable.subscribe({
          next:(value)=>{
            console.log(value);

            if (!value.isError()) this._userStatus.setUser(value.getValue());
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
