import { FormControl } from "@angular/forms";

export interface VerificationPasswordForm{
  password:FormControl<string>;
  confirmationPassword:FormControl<string>;
}
