import { Observable } from "rxjs";
import { Category } from "../category.model";

export interface ICategoryApiService {
  getByParams(params?: string): Observable<Category[]>;
}