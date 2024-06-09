import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../../../../shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css'
})
export class BottomBarComponent {
  public darkModeService = inject(DarkModeService)
}
