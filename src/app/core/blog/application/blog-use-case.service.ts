import { Observable } from "rxjs";
import { PartialBlog, Blog } from "../domain/blog.model";
import { IBlogUseCase } from "../domain/interfaces/blog-use-case.interface";
import { IBlogApiService } from "../domain/interfaces/blog-api-service.interface";

export class BlogUseCaseService implements IBlogUseCase {
  
  constructor(private _blogApiService: IBlogApiService) {}

  getByParams(params?: string): Observable<PartialBlog[]> {
    return this._blogApiService.getByParams(params ?? '');
  }
  getById(id: string): Observable<Blog> {
    return this._blogApiService.getById(id);
  }

}