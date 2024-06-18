import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarService } from './presentation/shared/services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';
import { DarkModeService } from './presentation/shared/services/dark-mode/dark-mode.service';
import { SwUpdate } from '@angular/service-worker';
import { NotificationService } from './presentation/home/services/notifications/Notification.service';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { enviroment } from '../environments/environment';
import { AuthUsecaseProvider } from './core/user/infraestructure/providers/auth-use-case-provider';
import { UserStatusService } from './core/user/infraestructure/services/user-status.service';

@Component({
  selector: 'app-root',
  template: `
    <div
      class="bg-custom-light dark:bg-custom-dark"
      [ngClass]="{ 'overflow-hidden h-screen': sidebarService.isSidebarActive() }"
    >
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    html, body {
      font-family: 'Muli';
    }
  `],
  standalone: true,
  imports: [RouterOutlet, NgClass]
})
export class AppComponent implements OnInit {

  private swUpdate = inject(SwUpdate);
  public sidebarService = inject(SidebarService);
  public darkModeService = inject(DarkModeService);
  private notification=inject(NotificationService)
  private authUseCaseService = inject(AuthUsecaseProvider);
  private userStatusService=inject(UserStatusService);

  constructor(private router: Router){
    this.authUseCaseService.usecase.currentUser().subscribe({
      next:(value)=>{
        if (!value.isError()){
          this.userStatusService.setUser(value.getValue())
          this.router.navigateByUrl('/home')
        }}
      }
    )
    this.router.navigateByUrl('/')
  }

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.isDarkMode();
  }

  ngOnInit() {
    const appFb = initializeApp(enviroment.firebase)
    const messaging = getMessaging(appFb)

    this.notification.requestPermission().then( token => {})

    onMessage(messaging, (payload) => {
      const title = payload.notification?.title
      const body = payload.notification?.body
      const icon='https://firebasestorage.googleapis.com/v0/b/chat-realtime-5e9cc.appspot.com/o/icon-128x128.png?alt=media&token=073a48a1-3adf-4bd8-a259-2ee99daf55c7'
      const noti = new Notification( title ?? 'title_dont_received' , { body: body, icon:icon})
      console.log('Message received. ', payload.notification);
    })

    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type == 'VERSION_DETECTED' && confirm('New version available. Load New Version?')) {
        window.location.reload();
      }
    });
  }
}
