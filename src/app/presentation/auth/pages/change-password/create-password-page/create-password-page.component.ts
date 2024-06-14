import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { ValidatorService } from '../../../../shared/services/validator/validator.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { VerificationPasswordForm } from '../../../interfaces/forms/createPassword-form.interface';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { TranslocoModule } from '@jsverse/transloco';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';
import { AuthUsecaseProvider } from '../../../../../core/user/infraestructure/providers/auth-use-case-provider';

@Component({
    selector: 'app-create-password-page',
    standalone: true,
    templateUrl: './create-password-page.component.html',
    styleUrl: './create-password-page.component.css',
    imports: [
        CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule,
        ErrorComponent,TranslocoModule
    ]
})
export class CreatePasswordPageComponent {
  private authUseCaseService = inject(AuthUsecaseProvider);
  public darkModeService = inject(DarkModeService);
  private router= inject(Router)
  public validatorService= inject(ValidatorService)
  private fb = inject(FormBuilder)
  private popupService=inject(PopupInfoModalService)

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
  public title='create Password'
  public subtitle='create a new password and please never share it with anyone for safe use'
  public updatePassword='update password'
  private errorStatusCode='The status response is not 200'


  isValidField(field:string){
    return this.validatorService.isValidField(this.createPasswordForm,field)
  }

  createPassword(){
    console.log(this.createPasswordForm.value);
    if(this.createPasswordForm.valid)
      {
        let {password}=this.createPasswordForm.value
        if (password){
          this.authUseCaseService.usecase.updatePassword(password)
          .subscribe({
            next:(value)=>value==200 ? this.router.navigateByUrl('/auth/confirmpassword') : this.popupService.displayErrorModal(this.errorStatusCode),
            error:(error)=>{
              this.popupService.displayErrorModal(error)
            }
          })
        }
      }
  }
}
