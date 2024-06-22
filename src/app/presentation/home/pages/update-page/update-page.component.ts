import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateForm } from '../../../auth/interfaces/forms/updateUser-form.interface';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import {MatCardModule} from '@angular/material/card';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';


@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule, MatInputModule, MatIconModule,CommonModule,TranslocoModule,
    MatCardModule
  ],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.css',
})
export class UpdatePageComponent {
  public updateUser='Update User'
  public saveProfileInfo='Save Changes'
  public saveProfileImage='Save Image'
  public SubmitButtonName='Submit'


  public userStatusService = inject(UserStatusService);
  public validatorService= inject(ValidatorService);
  public darkModeService = inject(DarkModeService);

  private fb = inject(FormBuilder)
  public user = this.userStatusService.currentUser();
  public hideFirstPasswordInput:boolean=false
  public hideSecondPasswordInput:boolean=false

  public updateUserForm :FormGroup<UpdateForm>=this.fb.group<UpdateForm>({
    name:new FormControl(null,{nonNullable:true, validators:[Validators.pattern(this.validatorService.firstNameAndLastnamePattern),Validators.required]}),
    email:new FormControl(null,{nonNullable:true,validators:[Validators.pattern(this.validatorService.emailPattern),Validators.required]}),
    phone:new FormControl(null,{nonNullable:true,validators:[Validators.pattern(this.validatorService.phoneNumberPattern),Validators.required]}),
    password:new FormControl(null,{nonNullable:true, validators:[Validators.pattern(this.validatorService.passwordPattern),Validators.required,Validators.minLength(6),Validators.maxLength(16)]})
  })


}
