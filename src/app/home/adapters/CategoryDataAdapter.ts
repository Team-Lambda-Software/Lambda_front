import { CategoriesResponse, ICategory } from "../interfaces/category-model"

export const CategoryDataAdapterCourse = (data: CategoriesResponse): ICategory =>{
    return {
        id: data.id,
        name: data.name,
    }
}