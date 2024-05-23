import { Observable } from "rxjs";
import { Trainer } from "../trainer.model";

export interface ITrainerUseCase {
  getById(id: string): Observable<Trainer>
}