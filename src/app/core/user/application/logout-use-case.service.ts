import { LoginEntryDomainDTO  } from '../domain/interfaces/entry/login-entry.dto';
import { AppUser } from '../domain/appuser';

import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';
import { Result } from '../../../common/helpers/Result';

import { Observable} from 'rxjs';
import { UserStatusService } from '../infraestructure/services/user-status.service';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { IAuthApiComunication } from '../domain/interfaces/auth-api-comunication.interface';


export class LogoutUseCaseService implements IUseCase<void,void> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:UserStatusService,
    private _authApiComunication:IAuthApiComunication) {}

  execute(): void {
    this._userStatus.setNotAuthenticated()
    this._authRepository.deleteToken()
    return
  }
}
