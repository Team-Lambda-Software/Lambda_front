import { Component, computed, inject,signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription, filter } from 'rxjs';

const BOTTOM_NAVIGATION_BAR_BLACK_LIST = [
  //'/home/player-video',
]
@Component({
  standalone: true,
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [RouterOutlet, SidebarComponent, BottomBarComponent]
})

export class LayoutComponent {
  private authService=inject(AuthService);
  public user= computed(()=>this.authService.currentUser());
  public subscriber?: Subscription;
  public isBottombarActive = signal<boolean>(false);
  constructor(private router: Router) { }
  public lastLink=this.router.url

  ngOnInit() {
    if (localStorage.getItem("token")) {

      this.router.navigateByUrl(this.lastLink)
      this.authService.current().subscribe()
    }
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
