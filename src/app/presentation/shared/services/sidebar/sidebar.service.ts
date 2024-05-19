import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public isSidebarActive = signal<boolean>(false);
  
  constructor() { }

  setSidebarState(state: boolean) {
    this.isSidebarActive.set(state);
  }


}
