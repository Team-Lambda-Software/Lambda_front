import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { IAuthRepository } from '../../../../../core/shared/application/ports/IAuthRepository.interface';
import { AuthLocalStorageService } from '../../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';

@Component({
  selector: 'app-create-password-confirm-page',
  standalone: true,
  imports: [
    CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,TranslocoModule
  ],
  templateUrl: './create-password-confirm-page.component.html',
  styleUrl: './create-password-confirm-page.component.css',
})
export class CreatePasswordConfirmPageComponent implements OnInit {

  public router=inject(Router)
  private _authRepository:IAuthRepository= new AuthLocalStorageService()

  public title="password Changed"
  public subtitle="congratulations You have successfully changed your password"
  public buttonName="back to login"

  ngOnInit(): void {
    this._authRepository.deleteCode()
    this._authRepository.deleteEmail()
    this._authRepository.deleteDateCode()
  }
}
