import { Inject, Injectable } from "@angular/core";
import { ICategoryApiService } from "../../../categories/domain/interfaces/category-api.interface";
import { HTTP_TRAINER_SERVICE } from "./category-api-provider";
import { TrainerUseCaseService } from "../../application/trainer-use-case.service";
import { ITrainerApiService } from "../../domain/interfaces/trainer-api.interface.";

@Injectable({ providedIn: "root" })
export class CategoyUsecaseProvider {
  public usecase: TrainerUseCaseService;

  constructor(
    @Inject(HTTP_TRAINER_SERVICE) private _trainerApiService: ITrainerApiService
  ) {
    this.usecase = new TrainerUseCaseService(this._trainerApiService);
  }
}