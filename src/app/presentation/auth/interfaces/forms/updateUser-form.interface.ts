import { FormControl } from "@angular/forms";

export interface UpdateForm{
  name:FormControl<string>;
  email:FormControl<string>;
  phone:FormControl<string>;
}

