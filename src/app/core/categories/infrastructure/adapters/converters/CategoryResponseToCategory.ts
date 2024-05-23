import { Category } from "../../../domain/category.model";
import { CategoryResponse } from "../dtos/category.dto";


export const CategoryResponseToCategory = (category: CategoryResponse): Category => ({
  ...category
})