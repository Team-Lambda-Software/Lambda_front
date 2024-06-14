import { Inject, Injectable } from "@angular/core";
import { HTTP_USER_SERVICE } from "./user-status-provider";
import { UserStatusService } from "../services/user-status.service";


@Injectable({ providedIn: "root" })

export class UserUsecaseProvider {
  public usecase: UserStatusService;

  constructor(
    @Inject(HTTP_USER_SERVICE) private _userApiService: UserStatusService) {
    this.usecase = new UserStatusService();
  }
}
