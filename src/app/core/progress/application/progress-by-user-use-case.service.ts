import { Observable } from "rxjs";
import { Result } from "../../../common/helpers/Result";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { IProgressApiComunication } from "./interfaces/progress-api-comunication";
import { CoursesByUserProgress } from "../domain/progress.model";


export class ProgressByUserUseCaseService implements IUseCase<string, Observable<Result<CoursesByUserProgress[]>>> {

  constructor(private _progressApiComunication: IProgressApiComunication) { }

  execute(data: string): Observable<Result<CoursesByUserProgress[]>> {
    return this._progressApiComunication.getCoursesByUserProgress(data)
  }
}