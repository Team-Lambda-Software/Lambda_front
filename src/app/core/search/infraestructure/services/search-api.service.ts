import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { enviroment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { SearchModel } from "../../domain/search-model";

@Injectable({ providedIn: "root" })
export class SearchApiService implements ISearchApiService {

  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/search';

  getBySearch(terms?: string): Observable<SearchModel> {
    let params = new HttpParams();
    if (terms) {
      params = params.append('term', terms);
    }
    return this._httpClient.get<SearchModel>(`${this.BASE_URL}`, { params });
  }
}