import { Injectable, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Optional } from '../../helpers/Optional';
import { ValidatorPatters } from '../../validators/validators-patterns';


@Injectable({
  providedIn: 'root'
})
export class ValidatorService{
  public firstNameAndLastnamePattern: string = '^[A-Za-záéíóúÁÉÍÓÚüÜ]+(?: [A-Za-záéíóúÁÉÍÓÚüÜ]+)? [A-Za-záéíóúÁÉÍÓÚüÜ]+(?: [A-Za-záéíóúÁÉÍÓÚüÜ]+)?$';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=-])\\S{8,16}$";
  public phoneNumberPattern: string = "^(\\+[0-9]{1,3})\\s[0-9]{3}\\s[0-9]{3}\\s[0-9]{3,4}$";
  public numberPattern:string="\\d*";

  public firstNameAndLastnamePatternMessage: string = 'Must have first and last name';
  public emailPatternMessage: string = "Must be acceted email. Ex:youremail@gmail.com";
  public passwordPatternMessage: string = "Must have one uppercase,lower case, one number and a special caracter and between 8 or 16 of legth Ex:Password12=";
  public phoneNumberPatternMessage: string = "Must be numbers Ex:+088 031 420 698";
  public numberPatternMessage:string="Must be a number";
  public termsAndCoditionsMessage:string='Must accept terms and conditions'

  public localPatterns:ValidatorPatters = new ValidatorPatters();

  public isValidField(form : FormGroup, field:string){
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form : FormGroup, field:string):Optional<string>{

    let answer= new Optional<string>(undefined)

    if (!form.controls[field] && !form.controls[field].errors) return answer

    const errors = form.controls[field].errors

    if (errors){

      for (const error of Object.keys(errors)) {
        console.log(error);

        switch(error){
          case 'required':{
            answer.setValue('This camp is required')
            return answer
          }
          case 'minlength':{
            answer.setValue(`This camp must have at least ${errors['minlength']} caracters of length`)
            return answer
          }
          case 'maxlength':{
            answer.setValue(`This camp must have at most ${errors['minlength']} caracters of length`)
            return answer
          }
            case 'requiredtrue':{
              let namePatter:string=''
              answer.setValue(`This camp must have at most be accepted`);
              return answer
            }
          case 'pattern':{
            answer.setValue(`pattern`)
            return answer
          }
        }
      }
    }
    return answer

  }
}
