import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { UserStore } from '../../../../core/user/infraestructure/user-store';

@Component({
  selector: 'app-header-card',
  standalone: true,
  imports: [
    CommonModule,RouterLink,TranslocoModule,NgxChartsModule
  ],
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.css',
})

export class HeaderCardComponent implements OnInit{

  @Input({ required: true }) redirectLastPage: string='/home/main';
  @Input({ required: true }) redirectNextPage: string='';
  public userStatusService = inject(UserStatusService)
  public user = this.userStatusService.currentUser();
  public progressValue=50;
  public userObservable=UserStore.getInstance().getObservable()
  public changePassword='Change Password'
  ngOnInit(): void {
    this.userObservable.subscribe(
      {
        next:(value)=>{
          this.user=value
        }
      }
    )
  }
 }
