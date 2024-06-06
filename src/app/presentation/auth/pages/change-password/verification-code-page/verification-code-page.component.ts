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


export class VerificationCodePageComponent implements OnInit{

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
  public pleaseResend="please resend"

  ngOnInit(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "info",
      title: "Code was send successfully, the code sent is valid for 5 minutes",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

  resendCode(){
    const email=this.email;
    if (email.hasValue())
      Swal.fire('Info',`Code resend to ${email.getValue()}`,'info')
      this.authService.getCodeUpdatePassword(email.getValue())
    .subscribe({
      error:(error)=>{
        Swal.fire('Error',error,'error')
      }
    })
  }

  verificateCode(){
    if (this.verificationCodeForm.valid){
      this.authService.verificateLocalCode(this.verificationCodeForm).subscribe({
        next:(value)=> value.status==201 ? this.router.navigateByUrl('/auth/createpassword') : Swal.fire('Error','The status response is not 201','error'),
        error:(error)=>{
          console.log(error);
          Swal.fire('Error',error,'error')
        }
      })
    }
  }
}
