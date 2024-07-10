import { Injectable } from "@angular/core";
import { TrainerFollowToggleUseCase } from "../../application/usecases/trainer-follow-toggle.service";
import { TrainerFollowToggleService } from "../services/trainer-follow-toggle.service";

@Injectable({ providedIn: "root" })
export class TrainerFollowToggleProvider {
  
  public usecase: TrainerFollowToggleUseCase;

  constructor() {
    this.usecase = new TrainerFollowToggleUseCase(new TrainerFollowToggleService())
  }
}
