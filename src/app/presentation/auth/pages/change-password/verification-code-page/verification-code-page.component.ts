import { CommonModule } from '@angular/common';
import { Component, inject, ElementRef, viewChild, ViewChild, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerificationCodeForm } from '../../../interfaces/forms/verticationCode-form.interface';
import { ValidatorService } from '../../../../shared/services/validator/validator.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';
import { AuthUsecaseProvider } from '../../../../../core/user/infraestructure/providers/auth-use-case-provider';
import { IAuthRepository } from '../../../../../core/shared/application/ports/IAuthRepository.interface';
import { AuthLocalStorageService } from '../../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';

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
  private authUseCaseService = inject(AuthUsecaseProvider);
  private popupService=inject(PopupInfoModalService)
  private _authRepository:IAuthRepository= new AuthLocalStorageService()

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
      this.authUseCaseService.usecase.getCodeUpdatePassword(email.getValue())
    .subscribe({
      next:(value)=>{ this.popupService.displayInfoModal(this.codeResendto) },
      error:(error)=>{
        this.popupService.displayErrorModal(error)
      }
    })
  }

  verificateCode(){
    if (this.verificationCodeForm.valid){
      let code = this.getCode(this.verificationCodeForm)
      this.authUseCaseService.usecase.verificateCode(code).subscribe({
        next:(value)=>{
          if (value==201){
            this.router.navigateByUrl('/auth/createpassword')
            this.popupService.displayBelowModal(this.codeSendSuccsessfully,'success')
          }
          else this.popupService.displayErrorModal(this.errorStatusCode)
        },
        error:(error)=>{
          this.popupService.displayErrorModal(error)
        }
      })
    }
  }
}
