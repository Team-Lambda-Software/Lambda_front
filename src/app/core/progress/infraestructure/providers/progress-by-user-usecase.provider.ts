import { Injectable } from "@angular/core";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";
import ProgressApiComunication from "../progress-api.service";
import { ProgressByUserUseCaseService } from "../../application/progress-by-user-use-case.service";

@Injectable({ providedIn: "root" })
export class ProgressByUserUseCaseProvider {
  usecase: ProgressByUserUseCaseService
  constructor() {
    this.usecase = new ProgressByUserUseCaseService(
      new ProgressApiComunication(
        new AuthLocalStorageService()
      )
    )
  }
}
