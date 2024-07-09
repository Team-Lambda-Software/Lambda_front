import { FormControl } from "@angular/forms";

export interface AddBlogForm{
  title:FormControl<string>;
  content:FormControl<string>;
  images:FormControl<File>;
  category:FormControl<string>;
  trainer:FormControl<string>;
}
