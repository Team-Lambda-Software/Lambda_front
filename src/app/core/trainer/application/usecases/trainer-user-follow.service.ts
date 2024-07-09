import { Observable } from "rxjs";
import { IUseCase } from "../../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../../common/helpers/Result";
import { ITrainerUserFollowService } from "../../domain/interfaces/trainer-user-follow.service";

export class TrainerUserFollowUseCase implements IUseCase<void,Observable<Result<number>>>{

  constructor(private _trainerUserFollowService: ITrainerUserFollowService) { }
  execute(data: void): Observable<Result<number>> {
    return this._trainerUserFollowService.getUserFollow()
  }

}
