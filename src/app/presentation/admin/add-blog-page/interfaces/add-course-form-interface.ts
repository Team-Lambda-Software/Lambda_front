import { FormControl } from "@angular/forms";

export interface AddCourseForm{
    title:FormControl<string | null>;
    description:FormControl<string | null>;
    category:FormControl<string | null>;
    trainer:FormControl<string | null>;
    weeks:FormControl<string | null>;
    mins:FormControl<string | null>;
    level:FormControl<string|null>
    image:FormControl<File|null>

  }
