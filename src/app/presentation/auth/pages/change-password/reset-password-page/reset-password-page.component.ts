import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';
import { AuthUsecaseProvider } from '../../../../../core/user/infraestructure/providers/auth-use-case-provider';
import { IAuthRepository } from '../../../../../core/shared/application/ports/IRepository.interface';
import { LocalStorageService } from '../../../../../core/shared/infraestructure/local-storage/local-storage.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ RouterLink,FormsModule,ReactiveFormsModule ,HttpClientModule,CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,TranslocoModule],

  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
})
export class ResetPasswordPageComponent implements OnInit {
  ngOnInit(): void {
    this._authRepository.deleteEmail()
    this._authRepository.deleteCode()
    this._authRepository.deleteDateCode()
  }
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  private authUseCaseService = inject(AuthUsecaseProvider);
  private router= inject(Router)
  private popupService=inject(PopupInfoModalService)
  private _authRepository:IAuthRepository= new LocalStorageService()


  public resetPasswordForm :FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.email]],
  })

  public title="reset Password"
  public subtitle="please enter your email address. you will get a link to create new password by email."
  public sendNewPassword="send New Password"
  public doYouWantToReturn="do you wan't to return to "
  public logInOption="log in"
  public sigUnOption="sign up"
  private codeSendSuccsessfully='Code was send successfully, the code sent is valid for 5 minutes'

  resetPassword(){
    const {email}=this.resetPasswordForm.value;
    this.authUseCaseService.usecase.getCodeUpdatePassword(email)
    .subscribe({
      next:()=>{
        this.popupService.displayBelowModal(this.codeSendSuccsessfully,'info')
        this.router.navigateByUrl('/auth/verificationcode')
      },
      error:(error)=>{
        this.popupService.displayErrorModal(error)
      }
    })
  }
}
