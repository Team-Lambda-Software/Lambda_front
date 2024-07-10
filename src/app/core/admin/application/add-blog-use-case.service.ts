
import { Result } from '../../../common/helpers/Result';
import { AddBlogAdminDto } from './interfaces/dto/add-blog-dto';
import { IAdminAddBlog } from './interfaces/admin-add-blog.interface';
import { IUseCase } from '../../shared/application/ports/IUseCase.interface';
import { Observable } from 'rxjs';

export class AddBlogAdminUseCase  implements IUseCase<AddBlogAdminDto,Observable<Result<number>>> {

  constructor(private adminCreateBlog: IAdminAddBlog) { }

  execute(data: AddBlogAdminDto): Observable<Result<number>> {
    return this.adminCreateBlog.execute(data)
  }
}
