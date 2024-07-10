import { Observable } from "rxjs";
import { TrainerDetail } from "../trainer.model";
import { Result } from "../../../../common/helpers/Result";

export interface ITrainerGetManyService {
  getMany(params: string): Observable<Result<TrainerDetail[]>>;
}
