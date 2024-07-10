import { FormControl } from "@angular/forms";
import { Category } from "../../../core/categories/domain/category.model";
import { Trainer } from "../../../core/trainer/domain/trainer.model";

export interface AddCourseForm{
    title:FormControl<string | null>;
    description:FormControl<string | null>;
    category:FormControl<Category | null>;
    trainer:FormControl<Trainer | null>;
    weeks:FormControl<string | null>;
    tags:FormControl<string | null>;
    level:FormControl<string|null>
    image:FormControl<File|null>

  }
