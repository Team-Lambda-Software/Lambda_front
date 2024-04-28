import { Component, HostBinding, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lambda_front';

  public isDarkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.isDarkMode();
  }

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode()));
    });
  }
}
