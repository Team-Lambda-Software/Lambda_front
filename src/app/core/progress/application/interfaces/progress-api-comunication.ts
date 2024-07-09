import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { ProgressTrending } from "./dto/progress-trending.interface";

export interface IProgressApiComunication{
  getProgressTrending():Observable<Result<ProgressTrending>>
}
