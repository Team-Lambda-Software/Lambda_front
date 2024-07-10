import { FormControl } from "@angular/forms";

export interface AddSectionForm{
    trainer:FormControl<string | null>;
    name:FormControl<string | null>;
    description:FormControl<string | null>;
    duration:FormControl<string | null>;
    image:FormControl<File|null>
  }
