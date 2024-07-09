import { FormControl } from "@angular/forms";

export interface AddBlogForm{
    title:FormControl<string | null>;
    content:FormControl<string | null>;
    category:FormControl<string | null>;
    trainer:FormControl<string | null>;
    tags:FormControl<string | null>;
    images:FormControl<File[]|null>
  }
