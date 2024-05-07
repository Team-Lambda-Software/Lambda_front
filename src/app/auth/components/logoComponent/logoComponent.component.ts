import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-component',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './logoComponent.component.html',
  styleUrl: './logoComponent.component.css',
})
export class LogoComponentComponent { }
