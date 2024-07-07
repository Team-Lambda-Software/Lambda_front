import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateForm } from '../../../auth/interfaces/forms/updateUser-form.interface';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import {MatCardModule} from '@angular/material/card';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { routerLocalStorageRepository } from '../../../../core/shared/infraestructure/local-storage/router-local-storage.service';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { UpdateUserUseCase } from '../../../../core/user/application/update-user-use-case.service';
import { UserApiService } from '../../../../core/user/infraestructure/services/user-api.service';
import { UpdateUSerEntryApplicationDTO } from '../../../../core/user/application/entry/update-user-entry.dto';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { Result } from '../../../../common/helpers/Result';
import { Optional } from '../../../../common/helpers/Optional';
import { catchError, map, Observable, throwError } from 'rxjs';
import * as pako from 'pako';



@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule, MatInputModule, MatIconModule,CommonModule,TranslocoModule,
    HeaderCardComponent,
    MatCardModule,ReactiveFormsModule
  ],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.css',
})
export class UpdatePageComponent {
  public updateUser='Update User'
  public saveProfileInfo='Save Changes'
  public saveProfileImage='Save Image'
  public SubmitButtonName='Submit'
  public succsesUpdateUser="User Updated successfully"
  public errorUploadingUserImage="Error uploading the new user image"

  public userStatusService = inject(UserStatusService);
  public validatorService= inject(ValidatorService);
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  public user = this.userStatusService.currentUser();
  public hideFirstPasswordInput:boolean=false
  public hideSecondPasswordInput:boolean=false
  public isLoadingUpdateUserFomr = false;
  private updateUserUseCase= new UpdateUserUseCase(this.userStatusService,new UserApiService())
  private popupService=inject(PopupInfoModalService)
  public UserPhotoUploadFile:Optional<File>=new Optional();



  public updateUserForm :FormGroup<UpdateForm>=this.fb.group<UpdateForm>({
    name:new FormControl(this.user.getValue().name,{validators:[Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]}),
    email:new FormControl(this.user.getValue().email,{validators:[Validators.pattern(this.validatorService.emailPattern)]}),
    phone:new FormControl(this.user.getValue().phone,{validators:[Validators.pattern(this.validatorService.phoneNumberPattern)]})
  })

  private createDTOUpdate():UpdateUSerEntryApplicationDTO{
    let image=''
    if(this.UserPhotoUploadFile.hasValue())
    this.convertFileToBase64(this.UserPhotoUploadFile.getValue()).subscribe({
      next:(base64)=>{
         console.log(base64)
         console.log(image);

        },
      error:(error)=> this.popupService.displayErrorModal(this.errorUploadingUserImage)
    })
    if(image==='') image===undefined
    let {email,name,phone}=this.updateUserForm.value
    let Data={email:email||undefined,
      name:name||undefined,
      phone:phone||undefined,
      image:image||undefined}
    return Data
  }

  private convertFileToBase64(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        observer.next(base64String);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsDataURL(file);
    });
  }

  updatePhoto(){
    console.log(this.UserPhotoUploadFile);
    console.log(this.createDTOUpdate());

  }

  loadImage(event:any){
    let file=event.target.files[0]
    if(!file) { this.UserPhotoUploadFile=new Optional()
      return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
    this.UserPhotoUploadFile=new Optional<File>(file);
    console.log('hola:',this.UserPhotoUploadFile.getValue());
  }

  public updateEmailPhoneName(){
    if(this.updateUserForm.valid){
      this.isLoadingUpdateUserFomr=true
      this.updateUserUseCase.execute(this.createDTOUpdate()).subscribe({
        next:(value)=>{
          if(!value.isError()){ this.popupService.displayInfoModal(this.succsesUpdateUser) }
          else this.popupService.displayErrorModal(value.getError().message)
        },
        error:(error:Result<Error>)=>{
          this.popupService.displayErrorModal(error.getError().message)
        }
      })
      this.isLoadingUpdateUserFomr=false
    }
  }
}
