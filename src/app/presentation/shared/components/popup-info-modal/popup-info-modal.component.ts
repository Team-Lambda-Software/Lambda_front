import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-info-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './popup-info-modal.component.html',
  styleUrl: './popup-info-modal.component.css',
})
export class PopupInfoModalComponent { }
