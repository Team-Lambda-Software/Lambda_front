import { Injectable } from "@angular/core";
import { IUseCase } from "../../../shared/application/ports/IUseCase.interface";
import { ProgressCourse } from "../../application/interfaces/dto/progress-course.interface";
import { Result } from "../../../../common/helpers/Result";
import { Observable } from "rxjs";
import { ProgressCourseUseCaseService } from "../../application/progress-course-use-case.service";
import ProgressApiComunication from "../progress-api.service";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";

@Injectable({ providedIn: "root" })
export class ProgressCourseUseCaseProvider {
    public usecase: IUseCase<string, Promise<Observable<Result<ProgressCourse>>>>;

    constructor() {
        this.usecase = new ProgressCourseUseCaseService(new ProgressApiComunication(new AuthLocalStorageService()));

    }
}

