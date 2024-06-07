import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import Swal from 'sweetalert2';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ RouterLink,FormsModule,ReactiveFormsModule ,HttpClientModule,CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,TranslocoModule],

  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
})
export class ResetPasswordPageComponent {
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  private authService=inject(AuthService)
  private router= inject(Router)
  private popupService=inject(PopupInfoModalService)

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
    console.log(this.resetPasswordForm.value);
    this.authService.getCodeUpdatePassword(email)
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
