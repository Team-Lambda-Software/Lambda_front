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

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ RouterLink,FormsModule,ReactiveFormsModule ,HttpClientModule,CommonModule,MatFormFieldModule, MatInputModule, MatIconModule],

  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
})
export class ResetPasswordPageComponent {
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  private authService=inject(AuthService)
  private router= inject(Router)

  public resetPasswordForm :FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.email]],
  })

  resetPassword(){
    const {email}=this.resetPasswordForm.value;
    console.log(this.resetPasswordForm.value);
    this.authService.getCodeUpdatePassword(email)
    .subscribe({
      next:()=> this.router.navigateByUrl('/auth/verificationcode'),
      error:(error)=>{
        console.log({loginerror:error});
      }
    })
  }
}
