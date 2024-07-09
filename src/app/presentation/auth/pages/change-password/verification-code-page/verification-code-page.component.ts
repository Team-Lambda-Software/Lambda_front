import { GetCodeUpdatePasswordUseCase } from './../../../../../core/user/application/get-code-update-password-use-case.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerificationCodeForm } from '../../../interfaces/forms/verticationCode-form.interface';
import { ValidatorService } from '../../../../shared/services/validator/validator.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';
import { IAuthRepository } from '../../../../../core/shared/application/ports/IAuthRepository.interface';
import { AuthLocalStorageService } from '../../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { UserStatusService } from '../../../../../core/user/infraestructure/services/user-status.service';
import { AuthApiService } from '../../../../../core/user/infraestructure/services/auth-api.service';
import { Result } from '../../../../../common/helpers/Result';
import { VerificateCodeUseCase } from '../../../../../core/user/application/verificate-code-use-case.service';

@Component({
  selector: 'app-verification-code-page',
  standalone: true,
  imports: [
    CommonModule,RouterLink,ReactiveFormsModule,TranslocoModule
  ],
  templateUrl: './verification-code-page.component.html',
  styleUrl: './verification-code-page.component.css',
})


export class VerificationCodePageComponent{

  public darkModeService = inject(DarkModeService);
  private router= inject(Router)
  private validatorService= inject(ValidatorService)
  private fb = inject(FormBuilder)
  private popupService=inject(PopupInfoModalService)
  private _authRepository:IAuthRepository= new AuthLocalStorageService();
  private userStatus=inject(UserStatusService)
  private getUpdateCodeUseCase= new GetCodeUpdatePasswordUseCase(new AuthLocalStorageService,new AuthApiService());
  private verificationCodeUseCase= new VerificateCodeUseCase(new AuthLocalStorageService,this.userStatus,new AuthApiService());

  public email=this._authRepository.getEmail()

  public verificationCodeForm :FormGroup<VerificationCodeForm>=this.fb.group<VerificationCodeForm>({
    firstCode:new FormControl('',{nonNullable:true, validators:[Validators.pattern(this.validatorService.numberPattern),Validators.required]}),
    secondCode:new FormControl('',{nonNullable:true,validators:[Validators.pattern(this.validatorService.numberPattern),Validators.required]}),
    thirdCode:new FormControl('',{nonNullable:true,validators:[Validators.pattern(this.validatorService.numberPattern),Validators.required]}),
    forthCode:new FormControl('',{nonNullable:true, validators:[Validators.pattern(this.validatorService.numberPattern),Validators.required]}),
  })


  public title="verification code"
  public subtitle="please type the verification code sent to"
  public buttonVerificateCode="verificate code"
  public iDontReceive="I don't receibe a dode!"
  public pleaseResend="please resend"
  private codeSendSuccsessfully='Code was was accepted successfully'
  private codeResendto=`Code resend to ${this.email.getValue()}`
  private errorStatusCode='The status response is not 201'

  getCode(verificationCodeForm:FormGroup<VerificationCodeForm>):string{
    let data=verificationCodeForm.value
    let numbers=Object.values(data);
    return numbers.join('')
  }


  resendCode(){
    const email=this.email;
    if (email.hasValue())
      this.userStatus.setChecking()
      this.getUpdateCodeUseCase.execute(email.getValue())
    .subscribe({
      next:(value)=>{ this.popupService.displayInfoModal(this.codeResendto)
      this.userStatus.setNotAuthenticated()
       },
      error:(error:Result<Error>)=>{
        this.userStatus.setNotAuthenticated()
        this.popupService.displayErrorModal(error.getError().message)
      }
    })
  }

  verificateCode(){
    if (this.verificationCodeForm.valid){
      let code = this.getCode(this.verificationCodeForm)
      this.userStatus.setChecking()
      this.verificationCodeUseCase.execute(code).subscribe({
        next:(value)=>{
          if (!value.isError()){
            let code=value.getValue();
          if (code>=200 && code<=299){
            this.router.navigateByUrl('/auth/createpassword')
            this.popupService.displayBelowModal(this.codeSendSuccsessfully,'success')
          }
          this.userStatus.setNotAuthenticated()
          }
          else this.popupService.displayErrorModal(this.errorStatusCode)
          this.userStatus.setNotAuthenticated()

        },
        error:(error:Result<Error>)=>{
          this.popupService.displayErrorModal(error.getError().message)
          this.userStatus.setNotAuthenticated()
        }
      })
    }
  }
}
