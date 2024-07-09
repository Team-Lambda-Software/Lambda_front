import { Observable } from "rxjs";
import { Trainer } from "../trainer.model";
import { Result } from "../../../../common/helpers/Result";

export interface ITrainerApiComunication {
  getById(id: string): Observable<Trainer>;
  getUserFollow():Observable<Result<number>>
}
