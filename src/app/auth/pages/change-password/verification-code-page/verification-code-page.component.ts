import { CommonModule } from '@angular/common';
import { Component, inject,ElementRef,viewChild, ViewChild, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { LocalStorage } from '../../../services/LocalStorage';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerificationCodeForm } from '../../../interfaces/forms/verticationCode-form.interface';
import { ValidatorService } from '../../../../shared/services/validator/validator.service';
import { TranslocoModule } from '@jsverse/transloco';
import Swal from 'sweetalert2';

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

  public isValid = signal<void>(
    this.verificateCode()
  );

  public title="verification code"
  public subtitle="please type the verification code sent to"
  public buttonVerificateCode="verificate code"
  public iDontReceive="I don't receibe a dode!"
  public pleaseResend="please Resend"
  resendCode(){
    const email=this.email;
    Swal.fire('Info',`Code resend to ${email.getValue()}`,'info')
    if (email.hasValue())
      this.authService.getCodeUpdatePassword(email.getValue())
    .subscribe({
      error:(error)=>{
        Swal.fire('Error',error,'error')
      }
    })
  }

  verificateCode(){
    if (this.verificationCodeForm.valid){
      const answer=this.authService.verificateLocalCode(this.verificationCodeForm)
      console.log(answer);

      if (answer){
        this.router.navigateByUrl('/auth/createpassword')
      }
      else{
        Swal.fire('Error','Something went wrong','error')
      }
    }
  }
}
