import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { ProgressTrending } from "./dto/progress-trending.interface";
import { ProgressCourse } from "./dto/progress-course.interface";
import { SaveProgressCourse } from "./dto/save-progress-course.interface";
import { CoursesByUserProgress } from "../../domain/progress.model";

export interface IProgressApiComunication {

  getProgressTrending(): Observable<Result<ProgressTrending>>

  getProgressCourse(idCourse: string): Observable<Result<ProgressCourse>>

  initializeProgressCourse(idCourse: string): Promise<Result<void>>

  saveProgress(data: SaveProgressCourse): Observable<Result<void>>

  getCoursesByUserProgress(params: string): Observable<Result<CoursesByUserProgress[]>>
}
