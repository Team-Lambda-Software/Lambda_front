import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { AddBlogAdminDto } from "./dto/add-blog-dto";

export interface IAdminAddBlog{
  execute(params: AddBlogAdminDto):Observable<Result<number>>
}
