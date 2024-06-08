import { CommonModule } from '@angular/common';
import { Component, inject, ElementRef, viewChild, ViewChild, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { LocalStorage } from '../../../services/LocalStorage';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerificationCodeForm } from '../../../interfaces/forms/verticationCode-form.interface';
import { ValidatorService } from '../../../../shared/services/validator/validator.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';

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

  private authService=inject(AuthService)
  public darkModeService = inject(DarkModeService);
  private router= inject(Router)
  private validatorService= inject(ValidatorService)
  private localStorage= new LocalStorage('','')
  private fb = inject(FormBuilder)
  private popupService=inject(PopupInfoModalService)

  public email=this.localStorage.LoadLocalStorage('email')

  // @ViewChild('miBoton') miBoton!: ElementRef;

  // private submitForm(){
  //   this.miBoton.nativeElement.click();
  // }

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


  resendCode(){
    const email=this.email;
    if (email.hasValue())
      this.popupService.displayInfoModal(this.codeResendto)
      this.authService.getCodeUpdatePassword(email.getValue())
    .subscribe({
      error:(error)=>{
        this.popupService.displayErrorModal(error)
      }
    })
  }

  verificateCode(){
    if (this.verificationCodeForm.valid){

      this.authService.verificateLocalCode(this.verificationCodeForm).subscribe({
        next:(value)=>{
          if (value.status==201){
            this.router.navigateByUrl('/auth/createpassword')
            this.popupService.displayBelowModal(this.codeSendSuccsessfully,'success')
          }
          else this.popupService.displayErrorModal(this.errorStatusCode)
        },
        error:(error)=>{
          console.log(error);
          this.popupService.displayErrorModal(error)
        }
      })
    }
  }
}
