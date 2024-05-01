import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { Subscription, filter } from 'rxjs';

const BOTTOM_NAVIGATION_BAR_BLACK_LIST = [
  '/home/player-video',
]
@Component({
  standalone: true,
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [RouterOutlet, SidebarComponent, BottomBarComponent]
})

export class LayoutComponent {
  public subscriber?: Subscription;
  public isBottombarActive = signal<boolean>(false);
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(BOTTOM_NAVIGATION_BAR_BLACK_LIST.includes(this.router.url))
    this.isBottombarActive.set(!BOTTOM_NAVIGATION_BAR_BLACK_LIST.includes(this.router.url))

    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log('holaaa')
      const currentUrl =  event.url
      console.log('The URL changed to: ', currentUrl)
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