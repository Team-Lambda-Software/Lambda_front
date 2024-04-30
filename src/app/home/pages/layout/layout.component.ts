import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';

@Component({
  standalone: true,
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports:[ RouterOutlet, SidebarComponent, BottomBarComponent ]
})
export class LayoutComponent { }