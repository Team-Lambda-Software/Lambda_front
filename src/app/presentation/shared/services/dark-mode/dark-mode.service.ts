import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  public isDarkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode()));
    });
  }
}
