import { Injectable } from "@angular/core";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";
import { ProgressTrendingUseCaseService } from "../../application/progress-trending-use-case.service";
import ProgressApiComunication from "../progress-api.service";

@Injectable({ providedIn: "root" })
export class ProgressTrendingUseCaseInfraestructure  {
  usecase:ProgressTrendingUseCaseService
  constructor() {
    this.usecase=new ProgressTrendingUseCaseService(new ProgressApiComunication(new AuthLocalStorageService()))
  }
}
