import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports:[ RouterOutlet, SidebarComponent, BottomBarComponent ]
})
export class LayoutComponent {
  private authService=inject(AuthService);

  public user= computed(()=>this.authService.currentUser());
  // get user(){
  //   return this.authService.currentUser()
  // }
}
