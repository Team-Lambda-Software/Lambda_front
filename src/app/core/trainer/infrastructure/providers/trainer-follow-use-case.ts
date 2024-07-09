import { Injectable } from "@angular/core";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";
import { TrainerUserFollowUseCase } from "../../application/usecases/trainer-user-follow.service";
import { TrainerUserFollowService } from "../services/trainer-user-follow.service";

@Injectable({ providedIn: "root" })
export class TrainerFollowUseCaseProvider {
  
  public usecase: TrainerUserFollowUseCase;

  constructor() {
    this.usecase = new TrainerUserFollowUseCase(
      new TrainerUserFollowService(
        new AuthLocalStorageService()
      )
    )
  }
}
