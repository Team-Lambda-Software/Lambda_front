import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { ErrorComponent } from '../../../shared/components/error/error.component';

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
    phone:['',[Validators.required,Validators.pattern(this.validatorService.phoneNumberPattern)]],
    password:['',[Validators.required,Validators.minLength(6)]],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  isValidField(field:string){
    return this.validatorService.isValidField(this.signUpForm,field)
  }

  register(){

    console.log(this.signUpForm.value);


    if(this.signUpForm.invalid){
      console.log('error');
    }
  }
}
