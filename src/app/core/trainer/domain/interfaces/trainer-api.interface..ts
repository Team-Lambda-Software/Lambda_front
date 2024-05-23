import { Observable } from "rxjs";
import { Trainer } from "../trainer.model";

export interface ITrainerApiService {
  getById(id: string): Observable<Trainer>
}