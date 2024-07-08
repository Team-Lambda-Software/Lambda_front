import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-update-login-page',
  standalone: true,
  imports: [
    CommonModule,HeaderCardComponent
  ],
  templateUrl: './update-login-page.component.html',
  styleUrl: './update-login-page.component.css',
})
export class UpdateLoginPageComponent { }
