import { Observable } from "rxjs";
import { TrainerDetail } from "../trainer.model";
import { Result } from "../../../../common/helpers/Result";

export interface ITrainerGetByIdService {
  getById(id: string): Observable<Result<TrainerDetail>>;
}
