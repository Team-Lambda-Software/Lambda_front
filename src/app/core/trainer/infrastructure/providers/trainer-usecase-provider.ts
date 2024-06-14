import { Inject, Injectable } from "@angular/core";
import { HTTP_TRAINER_SERVICE } from "./trainer-api-provider";
import { TrainerUseCaseService } from "../../application/trainer-use-case.service";
import { ITrainerApiService } from "../../domain/interfaces/trainer-api.interface.";

@Injectable({ providedIn: "root" })
export class TrainerUsecaseProvider {
  public usecase: TrainerUseCaseService;

  constructor(
    @Inject(HTTP_TRAINER_SERVICE) private _trainerApiService: ITrainerApiService
  ) {
    this.usecase = new TrainerUseCaseService(this._trainerApiService);
  }
}