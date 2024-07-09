import { Observable } from "rxjs";
import { Result } from "../../../../../common/helpers/Result";

export interface ITrainerUserFollowService {
  getUserFollow(): Observable<Result<number>>
}
