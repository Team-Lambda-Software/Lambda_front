import { Observable } from "rxjs";
import { Result } from "../../../common/helpers/Result";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { SaveProgressCourse } from "./interfaces/dto/save-progress-course.interface";
import { IProgressApiComunication } from "./interfaces/progress-api-comunication";


export class SaveProgressUseCaseService implements IUseCase<SaveProgressCourse, Observable<Result<void>>> {

    constructor(private _progressApiComunication: IProgressApiComunication) { }

    execute(data: SaveProgressCourse): Observable<Result<void>> {
        return this._progressApiComunication.saveProgress(data)
    }
}