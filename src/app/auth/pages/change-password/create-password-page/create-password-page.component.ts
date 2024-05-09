import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { ValidatorService } from '../../../../shared/services/validator/validator.service';
import { LocalStorage } from '../../../services/LocalStorage';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { VerificationPasswordForm } from '../../../interfaces/forms/createPassword-form.interface';
import { ErrorComponent } from "../../../../shared/components/error/error.component";

@Component({
    selector: 'app-create-password-page',
    standalone: true,
    templateUrl: './create-password-page.component.html',
    styleUrl: './create-password-page.component.css',
    imports: [
        CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule,
        ErrorComponent
    ]
})
export class CreatePasswordPageComponent {
  private authService=inject(AuthService)
  public darkModeService = inject(DarkModeService);
  private router= inject(Router)
  public validatorService= inject(ValidatorService)
  private localStorage= new LocalStorage('','')
  private fb = inject(FormBuilder)
  public hideConfirm = true;
  public hidePassword = true;
  public createPasswordForm :FormGroup<VerificationPasswordForm>=this.fb.group<VerificationPasswordForm>({
    password:new FormControl('',{nonNullable:true, validators:[Validators.pattern(this.validatorService.passwordPattern),Validators.required]}),
    confirmationPassword:new FormControl('',{nonNullable:true,validators:[Validators.pattern(this.validatorService.passwordPattern),Validators.required]})
  },{
    validators:[
      this.validatorService.isFieldEqualToOtherField('password','confirmationPassword')
    ]
  }
)

  isValidField(field:string){
    return this.validatorService.isValidField(this.createPasswordForm,field)
  }

  createPassword(){
    console.log(this.createPasswordForm.value);
    if(this.createPasswordForm.valid)
      {
        let {password}=this.createPasswordForm.value
        if (password){
          this.authService.updatePassword(password)
          .subscribe({
            next:()=> this.router.navigateByUrl('/auth/confirmpassword'),
            error:(error)=>{
              console.log({createPasswordError:error});
            }
          })
        }
      }
  }
}
