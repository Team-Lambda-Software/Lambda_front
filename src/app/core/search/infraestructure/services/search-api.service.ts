import { afterNextRender, inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { enviroment } from "../../../../../environments/environment";
import { catchError, map, Observable, throwError } from "rxjs";
import { SearchModel } from "../../domain/search-model";
import { Result } from "../../../../common/helpers/Result";
import { ITag } from "../../domain/tags-model";

@Injectable({ providedIn: "root" })
export class SearchApiService implements ISearchApiService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/search';

  getBySearch(terms?: string, tags?: string[]): Observable<SearchModel> {
    let params = new HttpParams();
    if (terms) {
      params = params.append('term', terms);
    }
    if (tags && tags.length > 0){
      tags.forEach(tag => params = params.append('tag', tag));
    }
    let req = this._httpClient.get<SearchModel>(`${this.BASE_URL}`, { params });
    req.subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    })
    return req;
  }

  getTags(params?: string | undefined): Observable<Result<ITag[]>> 
  {
    
    return this._httpClient.get<string[]>(`${this.BASE_URL}/popular/tags${params ?? ''}`)
    .pipe(
      map((response)=>{
        let res : ITag[];
        res = response.map(item => {
          return {
            name: item
          }
        })
        return Result.makeResult(res)
      }),
      catchError(error=>{
        return throwError(()=>Result.makeError(new Error(error.message)))
      })
    )
  }
}
