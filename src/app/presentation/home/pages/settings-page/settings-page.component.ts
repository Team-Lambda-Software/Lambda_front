import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { AvailableLangs } from '../../../shared/interfaces/available-lang.model';

interface SettingsOptions {
  icon: string;
  color: string;
  optionName: string;
  redirect?: string
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [NgClass, NgStyle, RouterLink, BasicHeaderComponent, TranslocoModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})

export class SettingsPageComponent {
  @ViewChild('accordion') accordion!: ElementRef;
  public isAccordionOpen = false;
  public translocoService = inject(TranslocoService);
  private router = inject(Router)
  public options: SettingsOptions[] = [
    {
      icon: 'fas fa-user',
      color: '#EB5757',
      optionName: 'account',
      redirect: '/home/profile'
    },
    {
      icon: 'fas fa-bell',
      color: '#219653',
      optionName: 'notifications',
      redirect: '/home/notification'
    },
    // {
    //   icon: 'fas fa-lock',
    //   color: '#2F80ED',
    //   optionName: 'privacy'
    // },
    {
      icon: 'fas fa-circle-question',
      color: '#9B51E0',
      optionName: 'FAQ',
      redirect: '/home/faq'
    },
    // {
    //   icon: 'fas fa-chart-pie',
    //   color: '#F2C94C',
    //   optionName: 'statistics'
    // },
    {
      icon: 'fas fa-language',
      color: '#56CCF2',
      optionName: 'language'
    },
    // {
    //   icon: 'fas fa-users',
    //   color: '#2F80ED',
    //   optionName: 'rate-us'
    // },
    // {
    //   icon: 'fas fa-user-group',
    //   color: '#F2994A',
    //   optionName: 'about'
    // },
  ]

  onClick(option: SettingsOptions) {
    if(option.redirect) this.router.navigate([option.redirect])
    if(option.optionName === 'language') {
      this.handleAccordion()
    }
  }

  getActiveLang() {
    return this.translocoService.getActiveLang();
  }

  setLanguage(lang: AvailableLangs) {
    this.translocoService.setActiveLang(lang);
  }


  handleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }
}
