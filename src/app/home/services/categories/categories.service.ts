import { HttpClient } from '@angular/common/http';
import { Injectable, inject,  } from '@angular/core';
import { CategoriesResponse } from '../../interfaces/category-model';
import { enviroment } from '../../../../env/enviroments';
import { Optional } from '../../../shared/helpers/Optional';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public http = inject(HttpClient);
  public categories: CategoriesResponse[] = [];

  constructor() { }

  getCategories() : Observable<CategoriesResponse[]>{
    return this.http.get<CategoriesResponse[]>(`${enviroment.baseUrl}/category`)
  }
}
