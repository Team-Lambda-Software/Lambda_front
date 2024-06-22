import { FormControl } from "@angular/forms";

export interface UpdateForm{
  name:FormControl<string | null>;
  email:FormControl<string | null>;
  phone:FormControl<string | null>;
  password:FormControl<string| null>;
}

