export interface ICategory {
  id: number | string;
  name: string;
}

export interface ICategoryHome extends ICategory {
  icon: string;
}

export interface CategoriesResponse {
  id: string;
  name: string;
  description: string;
  icon: Icon;
}

export interface Icon {
  url: string;
  id: string;
}
