import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';

@Component({
  selector: 'app-update-change-password-page',
  standalone: true,
  imports: [
    CommonModule,HeaderCardComponent
  ],
  templateUrl: './update-change-password-page.component.html',
  styleUrl: './update-change-password-page.component.css',
})
export class UpdateChangePasswordPageComponent { }
