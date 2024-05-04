import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public passwordPattern: string= "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-])(?=.*\s)[a-zA-Z\d!@#$%^&*()_+=-]{8,16}$"
  public phoneNumberPattern: string = "^(\\+[0-9]{3}) [0-9]{3} [0-9]{3} [0-9]{3}$";
  public numberPattern:string="\\d*";

  public isValidField(form : FormGroup, field:string){
    return form.controls[field].errors && form.controls[field].touched;
  }
}
