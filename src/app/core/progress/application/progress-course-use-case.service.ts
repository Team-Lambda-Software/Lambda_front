import { Observable } from 'rxjs';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { Result } from '../../../common/helpers/Result';
import { IProgressApiComunication } from './interfaces/progress-api-comunication';
import { ProgressCourse } from './interfaces/dto/progress-course.interface';

export class ProgressCourseUseCaseService implements IUseCase<string, Promise<Observable<Result<ProgressCourse>>>> {

    constructor(private _progressApiComunication: IProgressApiComunication) { }

    async execute(data: string): Promise<Observable<Result<ProgressCourse>>> {

        let init = await this._progressApiComunication.initializeProgressCourse(data)

        init.isError() ? console.error(init.getError()) : console.log('ProgressCourseUseCaseService: ProgressCourse initialized')

        return this._progressApiComunication.getProgressCourse(data)
    }
}