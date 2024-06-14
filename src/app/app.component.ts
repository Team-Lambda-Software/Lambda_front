import { Component, HostBinding, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarService } from './presentation/shared/services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';
import { DarkModeService } from './presentation/shared/services/dark-mode/dark-mode.service';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './presentation/auth/services/auth.service';
import { AuthStatus } from './core/user/domain/interfaces/auth-status.enum';
import { AuthUsecaseProvider } from './core/user/infraestructure/providers/auth-use-case-provider';
import { UserStatusService } from './core/user/application/user-status.service';
import { map, pipe } from 'rxjs';

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
export class AppComponent {

  private swUpdate = inject(SwUpdate);
  public sidebarService = inject(SidebarService);
  public darkModeService = inject(DarkModeService);
  private authUseCaseService = inject(AuthUsecaseProvider);
  private userStatusService=inject(UserStatusService);

  constructor(private router: Router){
    this.authUseCaseService.usecase.currentUser().subscribe({
      next:(value)=>{if (!value.isError())this.userStatusService.setUser(value.getValue()),this.router.navigateByUrl('/home')}
      }
    )
    this.router.navigateByUrl('/')
  }

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.isDarkMode();
  }

  ngOnInit() {
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type == 'VERSION_DETECTED' && confirm('New version available. Load New Version?')) {
        window.location.reload();
      }
    });
  }
}
