import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './presentation/shared/services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';
import { DarkModeService } from './presentation/shared/services/dark-mode/dark-mode.service';
import { SwUpdate } from '@angular/service-worker';
import { NotificationService } from './presentation/home/services/notifications/Notification.service';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { enviroment } from '../environments/environment';

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
      const noti = new Notification( title ?? 'title_dont_received' , { body: body })
      console.log('Message received. ', payload.notification);
    })
    
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type == 'VERSION_DETECTED' && confirm('New version available. Load New Version?')) {
        window.location.reload();
      }
    });
  }
}
