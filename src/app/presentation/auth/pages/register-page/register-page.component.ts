import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { SignUpEntryDomainDTO } from '../../../../core/user/domain/interfaces/entry/signup-entry.dto';

import { SignUpForm } from '../../interfaces/forms/signup-form.interface';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { UserType } from '../../../../core/user/domain/interfaces/Usertype.interface';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { AuthUsecaseProvider } from '../../../../core/user/infraestructure/providers/auth-use-case-provider';
import { Result } from '../../../../common/helpers/Result';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true,
  imports: [ RouterLink,FormsModule,ReactiveFormsModule ,HttpClientModule,MatFormFieldModule, MatInputModule, MatIconModule,CommonModule,MatCheckboxModule,TranslocoModule]

})
export class RegisterPageComponent {
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  public validatorService= inject(ValidatorService)
  private router= inject(Router)
  private popupService=inject(PopupInfoModalService)
  private authUseCaseService = inject(AuthUsecaseProvider);
  private userStatusService=inject(UserStatusService)


  public hide:boolean=false

  public title="sign up"
  public SignUpbuttonName='sign up'
  public AcceptAll="yes ! I agree all"
  public terms="terms"
  public letter="&"
  public conditions="conditions"

  public signUpForm :FormGroup<SignUpForm>=this.fb.group<SignUpForm>({
    name:new FormControl(null,{nonNullable:true, validators:[Validators.pattern(this.validatorService.firstNameAndLastnamePattern),Validators.required]}),
    email:new FormControl(null,{nonNullable:true,validators:[Validators.pattern(this.validatorService.emailPattern),Validators.required]}),
    phone:new FormControl(null,{nonNullable:true,validators:[Validators.pattern(this.validatorService.phoneNumberPattern),Validators.required]}),
    password:new FormControl(null,{nonNullable:true, validators:[Validators.pattern(this.validatorService.passwordPattern),Validators.required,Validators.minLength(6),Validators.maxLength(16)]}),
    termsAndConditions:new FormControl(null,{nonNullable:true, validators:[Validators.requiredTrue]})
  })

  isValidField(field:string){
    return this.validatorService.isValidField(this.signUpForm,field)
  }

  splitNamesAndLastNames(fullName: string): string[] {
    const namesAndLastNames = fullName.split(' ');

    let firstName=''
    let firstLastName=''
    let secondName=''
    let secondLastName=''

    if (namesAndLastNames.length===2){
      firstName = namesAndLastNames[0];
      firstLastName = namesAndLastNames[1];
      secondName = ''
      secondLastName = ''
    }
    if (namesAndLastNames.length===3){
      firstName = namesAndLastNames[0];
      firstLastName = namesAndLastNames[1];
      secondLastName = namesAndLastNames[2];
    }
    if (namesAndLastNames.length===4){
      firstName = namesAndLastNames[0];
      secondName = namesAndLastNames[1];
      firstLastName = namesAndLastNames[2];
      secondLastName = namesAndLastNames[3];
    }
    return [firstName, secondName, firstLastName, secondLastName];
  }


  createSignUpEntryDomainDTO(registerData:FormGroup<SignUpForm>):SignUpEntryDomainDTO{
    const data= registerData
    const email=data.value.email || ''
    const name=data.value.name  || ''
    const phone=data.value.phone  || ''
    const password=data.value.password || ''

    let newUser:SignUpEntryDomainDTO={
      email,
      password,
      name,
      phone,
      type: UserType.CLIENT
    }
    return (newUser);
  }

  register(){

    if(this.signUpForm.valid){
      let newUser:SignUpEntryDomainDTO=this.createSignUpEntryDomainDTO(this.signUpForm)
      this.authUseCaseService.usecase.signup(newUser)
        .subscribe({
          next:(answer)=>{
            if(!answer.isError()) {
            this.router.navigateByUrl('/auth/on-boarding')
            this.userStatusService.setUser(answer.getValue())}
            else this.popupService.displayErrorModal(answer.getError().message)
          },
          error:(error:Result<Error>)=>{
             this.popupService.displayErrorModal(error.getError().message)
          }
        })
    }
  }
}
