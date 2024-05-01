import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true,
  imports: [ RouterLink ]
})
export class RegisterPageComponent {
  public darkModeService = inject(DarkModeService);
}
