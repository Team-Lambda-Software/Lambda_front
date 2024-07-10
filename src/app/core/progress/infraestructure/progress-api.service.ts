import { catchError, firstValueFrom, map, Observable, of, switchMap, throwError } from "rxjs";
import { Result } from "../../../common/helpers/Result";
import { IProgressApiComunication } from "../application/interfaces/progress-api-comunication";
import { inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from "../../../../environments/environment";
import { IAuthRepository } from "../../shared/application/ports/IAuthRepository.interface";
import { ProgressTrendingResponse } from "./adapters/dto/ProgressTrendingResponse";
import { ProgressTrending } from "../application/interfaces/dto/progress-trending.interface";
import { CourseProgressResponse } from "./adapters/dto/CourseProgressResponse";
import { ProgressCourse } from "../application/interfaces/dto/progress-course.interface";
import { SaveProgressCourse } from "../application/interfaces/dto/save-progress-course.interface";

export default class ProgressApiComunication implements IProgressApiComunication {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/progress'

  constructor(private _authRepository: IAuthRepository) { }
  

  getProgressTrending(): Observable<Result<ProgressTrending>> {
    const url = `${this.BASE_URL}/trending`
    let token = this._authRepository.getToken()
    if (!token.hasValue()) return of(Result.makeError<ProgressTrending>(new Error('Error No tiene Token')))

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token.getValue()}`)
    return this._httpClient.get<ProgressTrendingResponse>(url, { headers })
      .pipe(
        map((response) => {
          return Result.makeResult({
            Percent: response.Percent,
            courseTitle: response.courseTitle,
            courseId: response.courseId,
            lastTime: response.lastTime
          })
        }),
        catchError(error => {
          return throwError(() => Result.makeError(new Error(error.error.message)))
        })
      )
  }


  async initializeProgressCourse(idCourse: string): Promise<Result<void>> {
    return firstValueFrom(
      this._httpClient.post(`${this.BASE_URL}/start/${idCourse}`, { courseId: idCourse })
      .pipe(
        map(() => Result.makeResult(undefined)),
        catchError((err) => {
          return of(Result.makeError<void>(new Error(err.error.message)));
        })
      )
    )
  }

  getProgressCourse(idCourse: string): Observable<Result<ProgressCourse>> {
    
        return this._httpClient.get<CourseProgressResponse>(`${this.BASE_URL}/one/${idCourse}`)
        .pipe(
          map((res) => {
            console.log(res); // para ver si funciona esta wea
            return Result.makeResult<ProgressCourse>({
              percent: res.percent,
              lessons: res.lessons.map((lesson) => ({
                lessonId: lesson.lessonId,
                time: lesson.time,
                percent: lesson.percent
              })),
            });
          }),
          catchError((err) => {
            return of(Result.makeError<ProgressCourse>(new Error(err.error.message)));
          })
        );
  }

      // .pipe(
      //   map((res) => {
      //     return Result.makeResult({
      //       lessons: res.lessons.map((lesson) => ({
      //         lessonId: lesson.lessonId,
      //         time: lesson.time,
      //       })),
      //     });
      //   }),
      //   catchError((err) => {
      //     return throwError(() => Result.makeError(new Error(err.error.message)));
      //   })
      // )
      

  saveProgress(data: SaveProgressCourse): Observable<Result<void>> {

    return this._httpClient.post(`${this.BASE_URL}/mark/end`, data)
      .pipe(
        map(() => Result.makeResult(undefined)),
        catchError((err) => {
          console.log(err.error.message);
          return throwError(() => Result.makeError(new Error(err.error.message)));
        })
      )
  }

}
