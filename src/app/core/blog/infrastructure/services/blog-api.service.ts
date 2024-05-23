import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from '../../../../../environments/environment';
import { IBlogApiService } from '../../domain/interfaces/blog-api-service.interface';
import { PartialBlog, Blog } from '../../domain/blog.model';
import { BlogResponse, PartialBlogResponse } from '../adapters/dtos/blog.dto';
import { BlogResponseToBlog } from '../adapters/converters/BlogResponseToBlog';
import { PartialBlogResponseToPartialBlog } from '../adapters/converters/PartialBlogResponseToPartialBlog';

@Injectable()
export class BlogApiService implements IBlogApiService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/blog'

  getByParams(params?: string | undefined): Observable<PartialBlog[]> {
    return this._httpClient.get<PartialBlogResponse[]>(`${this.BASE_URL}/many${params ?? ''}`)
      .pipe(map( b => b.map(PartialBlogResponseToPartialBlog)))
  }
  getById(id: string): Observable<Blog> {
    return this._httpClient.get<BlogResponse>(`${this.BASE_URL}/one/${id}`)
      .pipe(map(BlogResponseToBlog))
  }


}