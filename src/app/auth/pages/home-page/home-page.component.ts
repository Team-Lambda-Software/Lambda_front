import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  public darkModeService = inject(DarkModeService);

}
