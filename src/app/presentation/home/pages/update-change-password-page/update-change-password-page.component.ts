import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '../../../auth/components/loader/loader.component';
import { UpdatePasswordForm } from '../../interfaces/forms/createPassword-form.interface';
import { UpdatePasswordUseCase } from '../../../../core/user/application/update-password-use-case.service';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { AuthApiService } from '../../../../core/user/infraestructure/services/auth-api.service';
import { Router } from '@angular/router';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { Result } from '../../../../common/helpers/Result';
import { UpdateUserUseCase } from '../../../../core/user/application/update-user-use-case.service';
import { UserApiService } from '../../../../core/user/infraestructure/services/user-api.service';

@Component({
  selector: 'app-update-change-password-page',
  standalone: true,
  imports: [
    CommonModule,HeaderCardComponent,MatIcon,
    MatFormFieldModule, MatInputModule, MatIconModule,CommonModule,TranslocoModule,
    HeaderCardComponent,
    MatCardModule,ReactiveFormsModule, LoaderComponent
  ],
  templateUrl: './update-change-password-page.component.html',
  styleUrl: './update-change-password-page.component.css',
})
export class UpdateChangePasswordPageComponent {
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  public validatorService= inject(ValidatorService)
  public userStatusService=new UserStatusService()
  private popupService=inject(PopupInfoModalService)
  private router= inject(Router)
  private updateUserUseCase= new UpdateUserUseCase(this.userStatusService,new UserApiService(new AuthLocalStorageService()),new AuthLocalStorageService())
  public hideFistPassword=false
  public hideSecondPassword=false
  public isLoadingUpdateUserForm=false
  public changePassword='Change Password'
  public ChangePasswordTitle='Change Password'
  public ChangePasswordSubtitle='Please enter your new password'
  public ChangePasswordSuccsessfull='Your password changed succsessfully'
  private errorStatusCode='The response was not successful'



  public updatePasswordForm :FormGroup<UpdatePasswordForm>=this.fb.group<UpdatePasswordForm>({
    password:new FormControl('',{nonNullable:true, validators:[Validators.pattern(this.validatorService.passwordPattern),Validators.required]}),
    confirmationPassword:new FormControl('',{nonNullable:true,validators:[Validators.pattern(this.validatorService.passwordPattern),Validators.required]})
  },{
    validators:[
      this.validatorService.isFieldEqualToOtherField('password','confirmationPassword')
    ]
  })
  public updatePassword(){
    if(this.updatePasswordForm.valid){
      this.isLoadingUpdateUserForm=true

        let {password}=this.updatePasswordForm.value
        if (password && password!==undefined){
            this.updateUserUseCase.execute({password:password}).subscribe({
              next:(value)=>{
                this.isLoadingUpdateUserForm=false
                if(!value.isError()){ this.popupService.displayInfoModal(this.ChangePasswordSuccsessfull)
                  this.router.navigateByUrl('/home')
                }
                else this.popupService.displayErrorModal(value.getError().message)
              },
              error:(error:Result<Error>)=>{
                this.isLoadingUpdateUserForm=false
                this.popupService.displayErrorModal(error.getError().message)
              },
            })

        }
      }
    }
  }

