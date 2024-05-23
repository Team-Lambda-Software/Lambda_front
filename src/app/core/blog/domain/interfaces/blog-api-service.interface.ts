import { Observable } from "rxjs"
import { Blog, PartialBlog } from "../blog.model"

export interface IBlogApiService {
  getByParams(params?: string): Observable<PartialBlog[]> 
  getById(id: string): Observable<Blog>
}