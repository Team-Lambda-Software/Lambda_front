import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-create-password-confirm-page',
  standalone: true,
  imports: [
    CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,TranslocoModule
  ],
  templateUrl: './create-password-confirm-page.component.html',
  styleUrl: './create-password-confirm-page.component.css',
})
export class CreatePasswordConfirmPageComponent {
  public router=inject(Router)
  public title="password Changed"
  public subtitle="congratulations You have successfully changed your password"
  public buttonName="back to login"
}
