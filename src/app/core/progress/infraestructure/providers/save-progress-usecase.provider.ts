import { Injectable } from "@angular/core";
import { IUseCase } from "../../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../../common/helpers/Result";
import { Observable } from "rxjs";
import ProgressApiComunication from "../progress-api.service";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";
import { SaveProgressCourse } from "../../application/interfaces/dto/save-progress-course.interface";
import { SaveProgressUseCaseService } from "../../application/save-progress-course-use-case.service";

@Injectable({ providedIn: "root" })
export class SaveProgressUseCaseProvider {
    public usecase: IUseCase<SaveProgressCourse,Observable<Result<void>>>;

    constructor() {
        this.usecase = new SaveProgressUseCaseService(new ProgressApiComunication(new AuthLocalStorageService()));

    }
}

