import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { AuthStatus } from '../../interfaces/auth-status.enum';
import { TranslocoModule } from '@jsverse/transloco';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: true,
  imports: [ RouterLink,FormsModule,ReactiveFormsModule ,HttpClientModule,MatFormFieldModule, MatInputModule, MatIconModule,CommonModule,
    TranslocoModule
  ]
})
export class LoginPageComponent {

  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  private authService=inject(AuthService)
  private router= inject(Router)
  public hide:boolean=false;
  public validatorService= inject(ValidatorService);

  public title="login"
  public emailLabel='email'
  public emailPlaceHolder='your email@gmail.com'
  public passwordLabel='password'
  public LogInbuttonName="login"
  public SignInbuttonName='sign up'
  public ForgetYourPassword="forget your password"
  public DontHaveAnAccount="don't have an account ?"

  public loginForm :FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    password:['',[Validators.required]]
  })

  login(){
    const {email,password}=this.loginForm.value;
    console.log(this.loginForm.value);
    this.authService.login(email,password)
    .subscribe({
      next:()=> this.router.navigateByUrl('/home'),
      error:(error)=>{
        Swal.fire('Error',error,'error')
        console.log({loginerror:error});
      }
    })
  }
}
