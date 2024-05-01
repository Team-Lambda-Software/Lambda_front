import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicHeaderComponent } from '../../../shared/components/basic-header/basic-header.component';

interface SettingsOptions {
  icon: string;
  color: string;
  optionName: string;
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [NgClass, NgStyle, RouterLink, BasicHeaderComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  public options: SettingsOptions[] = [
    {
      icon: 'fas fa-user',
      color: '#EB5757',
      optionName: 'Account'
    },
    {
      icon: 'fas fa-bell',
      color: '#219653',
      optionName: 'Notifications'
    },
    {
      icon: 'fas fa-lock',
      color: '#2F80ED',
      optionName: 'Privacy'
    },
    {
      icon: 'fas fa-circle-question',
      color: '#9B51E0',
      optionName: 'FAQ'
    },
    {
      icon: 'fas fa-chart-pie',
      color: '#F2C94C',
      optionName: 'Statistics'
    },
    {
      icon: 'fas fa-language',
      color: '#56CCF2',
      optionName: 'Language'
    },
    {
      icon: 'fas fa-users',
      color: '#2F80ED',
      optionName: 'Rate Us'
    },
    {
      icon: 'fas fa-user-group',
      color: '#F2994A',
      optionName: 'About'
    },
  ]
}
