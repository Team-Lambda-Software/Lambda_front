import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './shared/services/sidebar/sidebar.service';
import { NgClass } from '@angular/common';
import { DarkModeService } from './shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, NgClass]
})
export class AppComponent {
  title = 'Lambda_front';

  public sidebarService = inject(SidebarService);
  public darkModeService = inject(DarkModeService);

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.isDarkMode();
  }

}
