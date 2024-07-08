import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { UpdatePasswordForm } from '../../interfaces/forms/updatePassword-form.interface';
import { LoginUseCaseService } from '../../../../core/user/application/login-use-case.service';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { AuthApiService } from '../../../../core/user/infraestructure/services/auth-api.service';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { LoginEntryApplicationDTO } from '../../../../core/user/application/entry/login-entry.dto';
import { Result } from '../../../../common/helpers/Result';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../auth/components/loader/loader.component';

@Component({
  selector: 'app-update-login-page',
  standalone: true,
  imports: [
    CommonModule,HeaderCardComponent,
    MatFormFieldModule, MatInputModule, MatIconModule,CommonModule,TranslocoModule,
    HeaderCardComponent,
    MatCardModule,ReactiveFormsModule, LoaderComponent

  ],
  templateUrl: './update-login-page.component.html',
  styleUrl: './update-login-page.component.css',
})
export class UpdateLoginPageComponent {
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  public validatorService= inject(ValidatorService)
  public userStatusService=new UserStatusService()
  private router= inject(Router)
  private loginUsecaseService=new LoginUseCaseService(
    new AuthLocalStorageService(), new AuthApiService());
  public ChangePasswordTitle='Change Password'
  public ChangePasswordSubtitle='Please enter your password for security'
  public hide:boolean=true
  private popupService=inject(PopupInfoModalService)
  public isLoadingUpdatePassword=false

  public updatePasswordForm :FormGroup<UpdatePasswordForm>=this.fb.group<UpdatePasswordForm>({
    password:new FormControl(null,{nonNullable:true, validators:[Validators.required]})
  })

  private createLoginDTO(){
    let data=this.updatePasswordForm.value
    let user=this.userStatusService.currentUser()
    if (!user.hasValue()) this.popupService.displayErrorModal('Error no user found')
    let LoginDTO:LoginEntryApplicationDTO={
      email:user.getValue().email,
      password:data.password || ''
    }
    return LoginDTO
  }

  updatePassword(){
    if (this.updatePasswordForm.valid){
      this.isLoadingUpdatePassword=true
      let data=this.updatePasswordForm.value
      if(!data) return this.popupService.displayErrorModal('Error there is no password')
      let loginDTO=this.createLoginDTO()
      this.loginUsecaseService.execute(this.createLoginDTO()).subscribe({
        next:(answer)=>{
          this.isLoadingUpdatePassword=false
          if(!answer.isError()) {this.router.navigateByUrl('/home/update/changepassword')}
          else this.popupService.displayErrorModal(answer.getError().message)
        },
        error:(error:Result<Error>)=>{
          this.isLoadingUpdatePassword=false
          this.popupService.displayErrorModal(error.getError().message)
        }
      })
    }
  }
 }
