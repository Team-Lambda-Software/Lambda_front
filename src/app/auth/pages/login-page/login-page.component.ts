import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: true,
  imports: [ RouterLink ]
})
export class LoginPageComponent {
  public darkModeService = inject(DarkModeService);
}
