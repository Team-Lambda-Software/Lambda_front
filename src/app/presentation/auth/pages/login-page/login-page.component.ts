import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { CommonModule } from '@angular/common';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { Result } from '../../../../common/helpers/Result';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { NotificationService } from '../../../home/services/notifications/Notification.service';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { AuthApiService } from '../../../../core/user/infraestructure/services/auth-api.service';
import { LoginUseCaseService } from '../../../../core/user/application/login-use-case.service';



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
  private router= inject(Router)
  private userStatusService=inject(UserStatusService)
  private loginUsecaseService=new LoginUseCaseService(
    new AuthLocalStorageService(), new AuthApiService());
  private notification=inject(NotificationService)

  private popupService=inject(PopupInfoModalService)
  public validatorService= inject(ValidatorService);

  public hide:boolean=false;

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
    this.userStatusService.setNotAuthenticated()
    this.loginUsecaseService.execute({email,password}).subscribe({
      next:(answer)=>{
        if(!answer.isError()) {
          this.userStatusService.setAuthenticated()
          this.router.navigateByUrl('/home')}
          // this.notification.saveNotificationToken().then( token => {})
      },
      error:(error:Result<Error>)=>{
        this.userStatusService.setNotAuthenticated()
         this.popupService.displayErrorModal(error.getError().message)
      }
    })
  }
}
