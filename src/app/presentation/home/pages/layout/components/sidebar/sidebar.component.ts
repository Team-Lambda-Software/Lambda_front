import { NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { SidebarService } from '../../../../../shared/services/sidebar/sidebar.service';
import { DarkModeService } from '../../../../../shared/services/dark-mode/dark-mode.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { AvailableLangs } from '../../../../../shared/interfaces/available-lang.model';
import { Router, RouterLink } from '@angular/router';
import { AuthUsecaseProvider } from '../../../../../../core/user/infraestructure/providers/auth-use-case-provider';
import { UserStatusService } from '../../../../../../core/user/infraestructure/services/user-status.service';

const LIMIT_TOUCHED_FOR_OPEN_SIDEBAR = 80;
const SLIP_THRESHOLD = 80;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, TranslocoModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private startX: number = 0;
  private threshold = SLIP_THRESHOLD;
  private authUseCaseService = inject(AuthUsecaseProvider);
  private router=inject(Router)
  private user=inject(UserStatusService)
  public sidebarService = inject(SidebarService);
  public darkModeService = inject(DarkModeService);
  public translocoService = inject(TranslocoService);

  @HostListener('document:touchstart', ['$event'])
  handleTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('document:touchstart', ['$event'])
  handleTouchStartRightToLeft(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('document:touchmove', ['$event'])
  handleTouchMove(event: TouchEvent) {
    if (this.startX < LIMIT_TOUCHED_FOR_OPEN_SIDEBAR && event.touches[0].clientX > this.startX + this.threshold) {
      this.sidebarService.setSidebarState(true);
    }
  }

  clickBackdrop() {
    if(this.sidebarService.isSidebarActive()) this.sidebarService.setSidebarState(false);
  }

  setLanguage(lang: AvailableLangs) {
    this.translocoService.setActiveLang(lang);
  }

  getActiveLang() {
    return this.translocoService.getActiveLang();
  }

  handleAccordion(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.children[0].children[1].classList.toggle('max-h-max')
    target.children[0].children[0].classList.toggle('pb-4');
  }

  logout() {
    this.authUseCaseService.usecase.logout();
    this.router.navigate(['/auth'])
  }

}
