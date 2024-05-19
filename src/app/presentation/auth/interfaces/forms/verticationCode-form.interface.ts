import { FormControl } from "@angular/forms";

export interface VerificationCodeForm{
  firstCode:FormControl<string>;
  secondCode:FormControl<string>;
  thirdCode:FormControl<string>;
  forthCode:FormControl<string>;
}
