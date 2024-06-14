import { Inject, Injectable } from "@angular/core";
import { AuthUseCaseService } from "../../application/auth-use-case.service";
import { IAuthApiService } from "../../domain/interfaces/auth-api.interface";
import { HTTP_AUTH_SERVICE } from "./auth-api-provider";


@Injectable({ providedIn: "root" })
export class AuthUsecaseProvider {
  public usecase: AuthUseCaseService;

  constructor(
    @Inject(HTTP_AUTH_SERVICE) private _authApiService: IAuthApiService) {
    this.usecase = new AuthUseCaseService(this._authApiService);
  }
}
