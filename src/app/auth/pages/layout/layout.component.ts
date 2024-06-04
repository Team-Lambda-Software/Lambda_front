import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true,
  imports: [ RouterOutlet ]
})

export class LayoutComponent {
 }
