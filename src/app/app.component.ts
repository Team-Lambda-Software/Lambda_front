import { Component, HostBinding, OnInit, computed, inject } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SidebarService } from './presentation/shared/services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';
import { DarkModeService } from './presentation/shared/services/dark-mode/dark-mode.service';
import { SwUpdate } from '@angular/service-worker';
import { NotificationService } from './presentation/home/services/notifications/Notification.service';
import { initializeApp } from '@firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { enviroment } from '../environments/environment';
import { UserStatusService } from './core/user/infraestructure/services/user-status.service';
import { Result } from './common/helpers/Result';
import { PopupInfoModalService } from './presentation/shared/services/popup-info-modal/popup-info-modal.service';
import { IRouterRepository } from './core/shared/application/ports/IRouterRepository.interface';
import { routerLocalStorageRepository } from './core/shared/infraestructure/local-storage/router-local-storage.service';
import { CurrentUserUseCaseService } from './core/user/application/current-use-case.service';
import { AuthLocalStorageService } from './core/shared/infraestructure/local-storage/auth-local-storage.service';
import { AuthApiService } from './core/user/infraestructure/services/auth-api.service';

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
  // Remove this option to use app local without notification
  private notification=inject(NotificationService)
  private userStatusService=inject(UserStatusService);
  private currentUseCaseService=new CurrentUserUseCaseService(
    new AuthLocalStorageService(),this.userStatusService, new AuthApiService);
  private popupService=inject(PopupInfoModalService);
  private _routerRepository:IRouterRepository= new routerLocalStorageRepository()

  constructor(private router: Router){
    const _lastUrl=this._routerRepository.getLastLink();

    this.currentUseCaseService.execute().subscribe({
      next:(value)=>{
        if (!value.isError()){
          this.userStatusService.setUser(value.getValue());
          if(!_lastUrl.hasValue()) this.router.navigateByUrl('/home');
          else this.router.navigateByUrl(_lastUrl.getValue());
        }
        else {
          if(!_lastUrl.hasValue()) this.router.navigateByUrl('/')
          else this.router.navigateByUrl(_lastUrl.getValue());
          this.popupService.displayErrorModal(value.getError().message)
        }},
      error:(error:Result<Error>)=>{
        this.router.navigateByUrl('/'),
        this.popupService.displayErrorModal(error.getError().message)
       }
      }
    )
  }

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.isDarkMode();
  }

  ngOnInit() {
    const appFb = initializeApp(enviroment.firebase)
    const messaging = getMessaging(appFb)

    this.notification.requestPermission().then( token => {} )

    onMessage(messaging, async (payload) => {
      const title = payload.notification?.title
      const body = payload.notification?.body
      const icon = 'https://firebasestorage.googleapis.com/v0/b/chat-realtime-5e9cc.appspot.com/o/icon-128x128.png?alt=media&token=073a48a1-3adf-4bd8-a259-2ee99daf55c7'
      const badge = 'https://firebasestorage.googleapis.com/v0/b/chat-realtime-5e9cc.appspot.com/o/logo-ligth.png?alt=media&token=75d987b9-5c25-4abb-a457-7f885c076fb2'
      console.log(' get onmessage: ', payload.notification)
      const swRegistration = await navigator.serviceWorker.register('../firebase-messaging-sw.js')
      swRegistration.showNotification( title??'title_dont_receiver', { body: body, badge: badge, icon: icon } )
    })

    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type == 'VERSION_DETECTED' && confirm('New version available. Load New Version?')) {
        window.location.reload();
      }
    });
  }
}
