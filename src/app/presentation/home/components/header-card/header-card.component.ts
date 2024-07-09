import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { UserStore } from '../../../../core/user/infraestructure/user-store';
import { TrainerUserFollowService } from '../../../../core/trainer/application/trainer-user-follow.service';
import { TrainerApiService } from '../../../../core/trainer/infrastructure/services/trainer-api.service';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { Result } from '../../../../common/helpers/Result';
import { TrainerFollowUseCaseInfraestructure } from '../../../../core/trainer/infrastructure/providers/trainer-follow-use-case';

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
  public userFollow=0
  public progressValue=50;
  public userObservable=UserStore.getInstance().getObservable()
  private popupService=inject(PopupInfoModalService)
  public changePassword='Change Password'
  public userFollowUseCase=inject(TrainerFollowUseCaseInfraestructure)
  ngOnInit(): void {
    this.userObservable.subscribe(
      {
        next:(value)=>{
          this.user=value
        }
      }
    )
    this.userFollowUseCase.usecase.execute().subscribe({
      next:(value)=>{
        if(!value.isError()) this.userFollow=value.getValue()
        else this.popupService.displayErrorModal(value.getError().message)
      },
      error:(error:Result<Error>)=>{
         this.popupService.displayErrorModal(error.getError().message)
      }
    })
  }
 }
