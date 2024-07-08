import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';

import { IUseCase } from '../../shared/application/ports/IUseCase.interface';

import { IUserStatusProvider } from '../domain/interfaces/user-status-provider.interface';


export class LogoutUseCaseService implements IUseCase<void,void> {

  constructor(private _authRepository:IAuthRepository, private _userStatus:IUserStatusProvider) {}

  execute(): void {
    this._userStatus.setNotAuthenticated()
    this._authRepository.deleteToken()
    return
  }
}
