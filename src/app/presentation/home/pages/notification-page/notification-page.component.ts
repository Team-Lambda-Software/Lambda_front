import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicHeaderNotificationComponent } from './basic-header-notification/basic-header-notification.component';
import { TranslocoModule } from '@jsverse/transloco';
import { NotificationUseCaseProvider } from '../../../../core/notification/infrastructure/providers/notification-usecase-provider';
import { Notification } from '../../../../core/notification/domain/notification.model';
import { StructureNotificationComponent } from './structure-notification/structure-notification.component';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { LoaderComponent } from '../../../auth/components/loader/loader.component';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink, TranslocoModule, StructureNotificationComponent,LoaderComponent,CommonModule],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent {

  private notificationUseCase = inject(NotificationUseCaseProvider)
  public darkModeService = inject(DarkModeService);
  public structure: Notification[] = [];
  public notificationIsloading:boolean=false

  ngOnInit(): void {
    this.notificationIsloading=true
    this.notificationUseCase.usecase.getNotificationByParams('?page=0&perPage=0')
      .subscribe(notifications => {
        this.structure.push(...notifications);
        this.sortNotificationsByDate();
        this.notificationIsloading=false
  });
 }

  private sortNotificationsByDate(): void {
    this.structure.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
     return dateB.getTime() - dateA.getTime();
    });
  }

  public clearNotifications(): void {
    this.structure = [];
  }
}



