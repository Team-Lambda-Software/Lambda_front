import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,TranslocoModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent{
  public darkModeService = inject(DarkModeService);
  public mainTitle="welcome to yoga Online class"
  public LogInbuttonName="login"
  public SignInbuttonName='signup'
  public DontHaveAnAccountInput="don't have an account ?"
}
