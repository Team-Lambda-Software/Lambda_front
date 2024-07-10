
import { Result } from '../../../common/helpers/Result';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { Observable } from 'rxjs';
import { IAddminAddSection } from './interfaces/admin-add-section.interface';
import { AddSectionAdminDto } from './interfaces/dto/add-section-dto';


export class AddSectionAdminUseCase implements IUseCase<AddSectionAdminDto,Observable<Result<number>>>  {

  constructor(private adminCreateBlog : IAddminAddSection){}

  execute(data: AddSectionAdminDto): Observable<Result<number>> {
    return this.adminCreateBlog.execute(data)
  }

}
