import { TrainerDetail } from "../../../domain/trainer.model";
import { TrainerResponse } from "../dtos/trainer.dto";

export const TrainerResponseToDetailTrainer = (trainer: TrainerResponse): TrainerDetail => ({
  ...trainer
})