import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { SignUpUser } from '../../interfaces/signup-user.interface';
import { SignUpForm } from '../../interfaces/signup-form.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true,
  imports: [ RouterLink,FormsModule,ReactiveFormsModule ,HttpClientModule,ErrorComponent]

})
export class RegisterPageComponent {
  public darkModeService = inject(DarkModeService);
  private fb = inject(FormBuilder)
  private validatorService= inject(ValidatorService)
  private authService=inject(AuthService)
  private router= inject(Router)

  public signUpForm :FormGroup=this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email:['',[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    phone:['',[Validators.required,Validators.minLength(6)]],

    // phone:['',[Validators.required,Validators.pattern(this.validatorService.phoneNumberPattern)]],
    password:['',[Validators.required,Validators.minLength(6)]],

    // password:['',[Validators.required,Validators.pattern(this.validatorService.passwordPattern)]],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  isValidField(field:string){
    return this.validatorService.isValidField(this.signUpForm,field)
  }


  //TODO: quitarle el any y hacerlo estricto con la separacion de nombres
  createSignUpUser(loginData:SignUpForm):SignUpUser{
    let newUser:SignUpUser={
      firstName:loginData.name,
      firstLastName:loginData.name,
      secondLastName:loginData.name,
      email:loginData.email,
      password:loginData.password
    }
    return newUser
  }

  register(){

    console.log(this.signUpForm.value);

    const {phone,...loginData}=this.signUpForm.value;
    let newUser:SignUpUser=this.createSignUpUser(loginData)
    this.authService.signup(newUser)
    .subscribe({
      next:()=> this.router.navigateByUrl('/home'),
      error:(error)=>{
        console.log({loginerror:error});
      }
    })
  }
}
