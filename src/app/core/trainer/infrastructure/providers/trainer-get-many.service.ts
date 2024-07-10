import { Injectable } from "@angular/core";
import { TrainerGetManyUseCase } from "../../application/usecases/trainer-get-many.service";
import { TrainerGetManyService } from "../services/trainer-get-many.service";

@Injectable({ providedIn: "root" })
export class TrainerGetManyProvider {
  
  public usecase: TrainerGetManyUseCase;

  constructor() {
    this.usecase = new TrainerGetManyUseCase(new TrainerGetManyService())
  }
}
