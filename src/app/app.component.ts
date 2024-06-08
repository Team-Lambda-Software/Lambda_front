import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './presentation/shared/services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';
import { DarkModeService } from './presentation/shared/services/dark-mode/dark-mode.service';
import { SwUpdate } from '@angular/service-worker';

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
  title = 'Lambda_front';

  private swUpdate = inject(SwUpdate);
  public sidebarService = inject(SidebarService);
  public darkModeService = inject(DarkModeService);

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
