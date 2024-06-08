import { Observable, of, tap } from 'rxjs';
import { Blog, PartialBlog } from '../domain/blog.model';
import { IBlogUseCase } from '../domain/interfaces/blog-use-case.interface';

export class ProxyBlogUseCase implements IBlogUseCase {
  
  private cacheProxy = {
    blogsByParamsMap: new Map<string, Observable<PartialBlog[]>>(),
    getByIdMap: new Map<string, Observable<Blog>>(),
  }

  constructor(private _blogUseCaseService: IBlogUseCase) { }
  
  getByParams(params: string | undefined): Observable<PartialBlog[]> {
    if ( this.cacheProxy.blogsByParamsMap.has(params ?? 'noParamsSent') ) return this.cacheProxy.blogsByParamsMap.get(params || 'noParamsSent')!
    else 
      return this._blogUseCaseService.getByParams(params)
              .pipe(tap(b => {
                this.cacheProxy.blogsByParamsMap.set(params ?? 'noParamsSent' , of(b))
              })) 

  }
  
  getById(id: string): Observable<Blog> {
    if(this.cacheProxy.getByIdMap.has(id)) return this.cacheProxy.getByIdMap.get(id)!
    else return this._blogUseCaseService.getById(id)
                  .pipe(tap(b => this.cacheProxy.getByIdMap.set(id, of(b))))
  }

  
}