import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-header-card',
  standalone: true,
  imports: [
    CommonModule,RouterLink,TranslocoModule,NgxChartsModule
  ],
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css',
})

export class HeaderCardComponent {
  @Input({ required: true }) redirectLastPage: string='/home/main';
  @Input({ required: true }) redirectNextPage: string='';
  public userStatusService = inject(UserStatusService)
  public user = this.userStatusService.currentUser();
  public progressValue=50;
 }
