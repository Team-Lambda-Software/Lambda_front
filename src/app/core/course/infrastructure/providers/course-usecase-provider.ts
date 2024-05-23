import { Inject, Injectable } from "@angular/core";
import { CourseUseCaseService } from "../../application/course-use-case.service";
import { HTTP_COURSE_SERVICE } from "./course-api-provider";
import { ICourseApiService } from "../../domain/interfaces/course-api.interface";

@Injectable({ providedIn: "root" })
export class CourseUsecaseProvider {
  public usecase: CourseUseCaseService;

  constructor(
    @Inject(HTTP_COURSE_SERVICE) private _courseApiService: ICourseApiService
  ) {
    this.usecase = new CourseUseCaseService(this._courseApiService);
  }
}