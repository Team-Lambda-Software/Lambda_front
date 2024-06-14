import { Component, computed, effect, inject,signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription, filter } from 'rxjs';
import { AuthStatus } from '../../../../core/user/domain/interfaces/auth-status.enum';
import { LoaderComponent } from "../../../auth/components/loader/loader.component";
import { UserStatusService } from '../../../../core/user/application/user-status.service';

const BOTTOM_NAVIGATION_BAR_BLACK_LIST:string[] = [
  // '/home/player-video',
]
@Component({
    standalone: true,
    selector: 'app-layout-page',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    imports: [RouterOutlet, SidebarComponent, BottomBarComponent, LoaderComponent]
})

export class LayoutComponent {
  public userStatusService=inject(UserStatusService)
  public subscriber?: Subscription;
  public isBottombarActive = signal<boolean>(false);
  constructor(private router: Router) { }
  public finishedAuthCheck= computed<boolean>(()=>{
    if (this.userStatusService.currentStatus()===AuthStatus.checking) return false
    return true
  })

  public authStatusChangeEffect= effect(()=>{
    let lastLink=this.router.url
    console.log(lastLink);
      switch(this.userStatusService.currentStatus()){
        case AuthStatus.checking:
          return;
        case AuthStatus.authenticated:{
          this.router.navigateByUrl(lastLink)
          return
        }
      }
  })

  ngOnInit() {

    this.isBottombarActive.set(!BOTTOM_NAVIGATION_BAR_BLACK_LIST.includes(this.router.url))

    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl =  event.url
      if(BOTTOM_NAVIGATION_BAR_BLACK_LIST.includes(currentUrl))
        this.isBottombarActive.set(false);
      else
        this.isBottombarActive.set(true)
    });
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
