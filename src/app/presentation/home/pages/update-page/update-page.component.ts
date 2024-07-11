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
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { UpdateUserUseCase } from '../../../../core/user/application/update-user-use-case.service';
import { UserApiService } from '../../../../core/user/infraestructure/services/user-api.service';
import { UpdateUSerEntryApplicationDTO } from '../../../../core/user/application/entry/update-user-entry.dto';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { Result } from '../../../../common/helpers/Result';
import { Optional } from '../../../../common/helpers/Optional';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { LoaderComponent } from '../../../auth/components/loader/loader.component';



@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule, MatInputModule, MatIconModule,CommonModule,TranslocoModule,
    LoaderComponent,
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
  public errorUploadingTypeImage="Error uploading the new user image, must be jpg jpeg png"


  public userStatusService = inject(UserStatusService);
  public validatorService= inject(ValidatorService);
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  public user = this.userStatusService.currentUser();
  public hideFirstPasswordInput:boolean=false
  public hideSecondPasswordInput:boolean=false
  public isLoadingUpdateUserForm = false;
  private updateUserUseCase= new UpdateUserUseCase(this.userStatusService,new UserApiService(new AuthLocalStorageService()),new AuthLocalStorageService())
  private popupService=inject(PopupInfoModalService)
  public UserPhotoUploadFile:Optional<File>=new Optional();
  public previewUploadFile:string=''


  public updateUserForm :FormGroup<UpdateForm>=this.fb.group<UpdateForm>({
    name:new FormControl(this.user.getValue().name || '',{nonNullable:true,validators:[Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]}),
    email:new FormControl(this.user.getValue().email ||'',{nonNullable:true,validators:[Validators.pattern(this.validatorService.emailPattern)]}),
    phone:new FormControl(this.user.getValue().phone || '',{nonNullable:true,validators:[Validators.pattern(this.validatorService.phoneNumberPattern)]})
  })

  private createDTOUpdate():UpdateUSerEntryApplicationDTO{

    let user=this.userStatusService.currentUser().getValue()

    let {email,name,phone}=this.updateUserForm.value

    if(user.email===email) email=undefined
    if(user.name===name) name=undefined
    if(user.phone===phone) phone=undefined

    let Data={
      email,
      name,
      phone
    }
    return Data
  }

  private async convertFileToBase64(event:any): Promise<any> {
    return new Promise((resolve, reject) => {
      try{
        const reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = () => {
          resolve({
            base:reader.result
          });
        };
        reader.onerror = (error) => {
          reject({
            base:null
          });
        };
      } catch(error){
        this.popupService.displayErrorModal(this.errorUploadingUserImage)
      }
    });
  }

  loadImage(event:any){
    let file:File=event.target.files[0]
    if(!file) {
      this.UserPhotoUploadFile=new Optional()
      this.previewUploadFile=''
      return this.popupService.displayErrorModal(this.errorUploadingUserImage)}

    const isValidImageExtension = this.validatorService.isValidImageExtension.test(file.name);

    if(!isValidImageExtension){
      this.previewUploadFile=''
      event.target.value = ''
      return this.popupService.displayErrorModal(this.errorUploadingTypeImage)
    }

    this.UserPhotoUploadFile=new Optional<File>(file);

    this.convertFileToBase64(file).then(imagen=>{
      this.previewUploadFile=imagen.base
    })

  }

  public updateEmailPhoneName(){
    if(this.updateUserForm.valid){
      let dto=this.createDTOUpdate()
      if(dto.email || dto.name || dto.phone)
      this.sendUpdatePettition(dto)
    }
  }

  private sendUpdatePettition(data:UpdateUSerEntryApplicationDTO){
    this.isLoadingUpdateUserForm=true
    this.updateUserUseCase.execute(data).subscribe({
      next:(value)=>{
        this.isLoadingUpdateUserForm=false
        if(!value.isError()){ this.popupService.displayInfoModal(this.succsesUpdateUser) }
        else this.popupService.displayErrorModal(value.getError().message)
      },
      error:(error:Result<Error>)=>{
        this.isLoadingUpdateUserForm=false
        this.popupService.displayErrorModal(error.getError().message)
      },
    })
  }

  public updatePhoto(){
    let image=''
    let images:string[]=[]

    if(this.UserPhotoUploadFile.hasValue()) images=this.previewUploadFile.split(',')
      image=images[1]

    if(image==='') image===undefined
    this.sendUpdatePettition({image:image});
  }
  constructor(private sanitizer:DomSanitizer){}
}
