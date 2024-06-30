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
import { IAuthRepository } from '../../../../../core/shared/application/ports/IAuthRepository.interface';
import { AuthLocalStorageService } from '../../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { GetCodeUpdatePasswordUseCase } from '../../../../../core/user/application/get-code-update-password-use-case.service';
import { UserStatusService } from '../../../../../core/user/infraestructure/services/user-status.service';
import { AuthApiService } from '../../../../../core/user/infraestructure/services/auth-api.service';
import { Result } from '../../../../../common/helpers/Result';

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
  private userStatus=inject(UserStatusService)
  private getCodeUpdatePasswordUseCase = new GetCodeUpdatePasswordUseCase(new AuthLocalStorageService(),this.userStatus,new AuthApiService())
  private router= inject(Router)
  private popupService=inject(PopupInfoModalService)
  private _authRepository:IAuthRepository= new AuthLocalStorageService()


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
    this.getCodeUpdatePasswordUseCase.execute(email)
    .subscribe({
      next:(response)=>{
        if(!response.isError()){
          this.popupService.displayBelowModal(this.codeSendSuccsessfully,'info')
          this.router.navigateByUrl('/auth/verificationcode')
        }else{
          this.popupService.displayErrorModal(response.getError().message)
        }
      },
      error:(error:Result<Error>)=>{
        this.popupService.displayErrorModal(error.getError().message)
      }
    })
  }
}
