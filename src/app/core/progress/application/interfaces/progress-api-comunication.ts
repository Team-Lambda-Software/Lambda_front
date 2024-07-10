import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { ProgressTrending } from "./dto/progress-trending.interface";
import { ProgressCourse } from "./dto/progress-course.interface";
import { SaveProgressCourse } from "./dto/save-progress-course.interface";

export interface IProgressApiComunication{

  getProgressTrending():Observable<Result<ProgressTrending>>

  getProgressCourse(idCourse: string):Observable<Result<ProgressCourse>>

  initializeProgressCourse(idCourse: string): Promise<Result<void>>

  saveProgress(data: SaveProgressCourse):Observable<Result<void>>
}
