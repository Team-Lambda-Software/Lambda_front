import { FormControl } from "@angular/forms";
import { Trainer } from "../../../../core/trainer/domain/trainer.model";
import { Category } from "../../../../core/categories/domain/category.model";

export interface AddBlogForm{
    title:FormControl<string | null>;
    content:FormControl<string | null>;
    category:FormControl<Category | null>;
    trainer:FormControl<Trainer | null>;
    tags:FormControl<string | null>;
    images:FormControl<File[]|null>
  }
