import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { Subscription, filter } from 'rxjs';
import { AuthStatus } from '../../../../core/user/domain/interfaces/auth-status.enum';
import { LoaderComponent } from "../../../auth/components/loader/loader.component";
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { NgClass } from '@angular/common';

const BOTTOM_NAVIGATION_BAR_BLACK_LIST: RegExp[] = [
  /\/home\/blogs-details\?id=.+/,
  /\/home\/search/,
  /\/home\/player-video\?course=.+/,
]
@Component({
  standalone: true,
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [
    RouterOutlet,
    SidebarComponent,
    BottomBarComponent,
    LoaderComponent,
    NgClass
  ]
})

export class LayoutComponent {
  public userStatusService = inject(UserStatusService)
  public subscriber?: Subscription;
  public isBottombarActive = signal<boolean>(false);
  constructor(private router: Router) { }
  public UserStatus = signal<AuthStatus>(this.userStatusService.currentStatus())
  public finishedAuthCheck = computed<boolean>(() => {
    // console.log(this.userStatusService.currentStatus());
    if (this.UserStatus() === AuthStatus.checking) return false
    return true
  })

  public authStatusChangeEffect = effect(() => {
    let lastLink = this.router.url
    // console.log(lastLink);
    switch (this.userStatusService.currentStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated: {
        this.router.navigateByUrl(lastLink)
        return
      }
    }
  })

  ngOnInit() {
    this.checkBottomBarStatus(this.router.url)

    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkBottomBarStatus(event.url)
    });
  }

  checkBottomBarStatus(currentUrl: string) {
    let isBottomActive = true
    for (const regexRoute of BOTTOM_NAVIGATION_BAR_BLACK_LIST) {
      if (regexRoute.test(currentUrl)){
        isBottomActive = false
        break
      }
    }
    this.isBottombarActive.set(isBottomActive)
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
