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
import { TranslocoModule } from '@jsverse/transloco';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';
import { AuthLocalStorageService } from '../../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { UserStatusService } from '../../../../../core/user/infraestructure/services/user-status.service';
import { AuthApiService } from '../../../../../core/user/infraestructure/services/auth-api.service';
import { Result } from '../../../../../common/helpers/Result';
import { UpdatePasswordUseCase } from '../../../../../core/user/application/update-password-use-case.service';

@Component({
    selector: 'app-create-password-page',
    standalone: true,
    templateUrl: './create-password-page.component.html',
    styleUrl: './create-password-page.component.css',
    imports: [
        CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule,
        TranslocoModule
    ]
})
export class CreatePasswordPageComponent {
  private userStatus=inject(UserStatusService)
  private updatePasswordUseCase= new UpdatePasswordUseCase(new AuthLocalStorageService(),this.userStatus,new AuthApiService)
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
  private errorStatusCode='The response was not successful'
  private correctStatusCode='The response was successful'



  isValidField(field:string){
    return this.validatorService.isValidField(this.createPasswordForm,field)
  }

  createPassword(){
    if(this.createPasswordForm.valid)
      {
        let {password}=this.createPasswordForm.value
        if (password){
          this.updatePasswordUseCase.execute(password)
          .subscribe({
            next:(value)=>{
              if(!value.isError()){
                let code=value.getValue()
                if (code>=200 && code<=299){
                  this.router.navigateByUrl('/auth/confirmpassword')
                  this.popupService.displayInfoModal(this.correctStatusCode)}
                else this.popupService.displayErrorModal(this.errorStatusCode)
              }
              else{
                this.popupService.displayErrorModal(this.errorStatusCode)
              }
            },
            error:(error:Result<Error>)=>{
              this.popupService.displayErrorModal(error.getError().message)
            }
          })
        }
      }
  }
}
