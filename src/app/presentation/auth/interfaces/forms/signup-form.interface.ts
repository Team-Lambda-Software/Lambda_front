import { FormControl } from "@angular/forms";

export interface SignUpForm{
  name:FormControl<string>;
  email:FormControl<string>;
  phone:FormControl<string>;
  password:FormControl<string>;
  termsAndConditions:FormControl<boolean>;
}

