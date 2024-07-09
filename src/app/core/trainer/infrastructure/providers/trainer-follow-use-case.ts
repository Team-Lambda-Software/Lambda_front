import { Inject, Injectable } from "@angular/core";
import { TrainerApiService } from "../services/trainer-api.service";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";
import { TrainerUserFollowService } from "../../application/trainer-user-follow.service";

@Injectable({ providedIn: "root" })
export class TrainerFollowUseCaseInfraestructure  {
  usecase:TrainerUserFollowService
  constructor() {
    this.usecase=new TrainerUserFollowService(new TrainerApiService(new AuthLocalStorageService()))
  }
}
