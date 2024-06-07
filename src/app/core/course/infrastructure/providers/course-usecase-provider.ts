import { Inject, Injectable } from "@angular/core";
import { CourseUseCaseService } from "../../application/course-use-case.service";
import { HTTP_COURSE_SERVICE } from "./course-api-provider";
import { ICourseApiService } from "../../domain/interfaces/course-api.interface";
import { ProxyCourseUseCase } from "../../application/proxy-course-use-case.service";
import { ICourseUseCase } from "../../domain/interfaces/course-use-case.interface";

@Injectable({ providedIn: "root" })
export class CourseUsecaseProvider {
  public usecase: ICourseUseCase;

  constructor(
    @Inject(HTTP_COURSE_SERVICE) private _courseApiService: ICourseApiService
  ) {
    this.usecase = new ProxyCourseUseCase(new CourseUseCaseService(this._courseApiService));
  }
}