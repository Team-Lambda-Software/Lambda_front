import { catchError, from, map, Observable, throwError } from 'rxjs';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { Result } from '../../../common/helpers/Result';
import { IProgressApiComunication } from './interfaces/progress-api-comunication';
import { ProgressCourse } from './interfaces/dto/progress-course.interface';

export class ProgressCourseUseCaseService implements IUseCase<string, Promise<Observable<Result<ProgressCourse>>>> {

    constructor(private _progressApiComunication: IProgressApiComunication) { }

    async execute(data: string): Promise<Observable<Result<ProgressCourse>>> {

        let init = await this._progressApiComunication.initializeProgressCourse(data)

        if(init.isError()){
            console.log(init.getError());
        }

        return this._progressApiComunication.getProgressCourse(data)
    }
}
