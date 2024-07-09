import { Observable } from "rxjs";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../common/helpers/Result";
import { ITrainerApiComunication } from "../domain/interfaces/trainer-api-comunication";

export class TrainerUserFollowService implements IUseCase<void,Observable<Result<number>>>{

  constructor(private _trainerApiComunication:ITrainerApiComunication) { }
  execute(data: void): Observable<Result<number>> {
    return this._trainerApiComunication.getUserFollow()
  }

}
