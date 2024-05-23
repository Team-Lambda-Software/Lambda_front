import { Observable } from "rxjs";
import { Category } from "../category.model";

export interface ICategoryUseCase {
  getByParams(params?: string): Observable<Category[]>;
}