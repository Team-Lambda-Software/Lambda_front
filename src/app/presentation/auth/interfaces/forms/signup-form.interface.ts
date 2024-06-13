import { FormControl } from "@angular/forms";

export interface SignUpForm{
  name:FormControl<string | null>;
  email:FormControl<string | null>;
  phone:FormControl<string | null>;
  password:FormControl<string| null>;
  termsAndConditions:FormControl<boolean | null>;
}

