import { NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { SidebarService } from '../../../../../shared/services/sidebar/sidebar.service';
import { DarkModeService } from '../../../../../shared/services/dark-mode/dark-mode.service';

const LIMIT_TOUCHED_FOR_OPEN_SIDEBAR = 80;
const SLIP_THRESHOLD = 80;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  private startX: number = 0;
  private threshold = SLIP_THRESHOLD;
  public sidebarService = inject(SidebarService);
  public darkModeService = inject(DarkModeService);

  @HostListener('document:touchstart', ['$event'])
  handleTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('document:touchmove', ['$event'])
  handleTouchMove(event: TouchEvent) {
    if (this.startX < LIMIT_TOUCHED_FOR_OPEN_SIDEBAR && event.touches[0].clientX > this.startX + this.threshold) {
      // this.isSidebarActive.set(true);
      this.sidebarService.setSidebarState(true);
    }
  }
}
