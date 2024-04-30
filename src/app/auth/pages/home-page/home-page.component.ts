import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnChanges, OnInit, SimpleChanges, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  public isDarkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );
}
