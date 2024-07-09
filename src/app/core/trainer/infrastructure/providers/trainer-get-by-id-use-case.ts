import { Injectable } from "@angular/core";
import { TrainerGetByIdService } from "../services/trainer-get-by-id.service";
import { TrainerGetByIdUseCase } from "../../application/usecases/trainer-get-by-id.service";

@Injectable({ providedIn: "root" })
export class TrainerGetByIdProvider {
  
  public usecase: TrainerGetByIdUseCase;

  constructor() {
    this.usecase = new TrainerGetByIdUseCase(new TrainerGetByIdService())
  }
}
