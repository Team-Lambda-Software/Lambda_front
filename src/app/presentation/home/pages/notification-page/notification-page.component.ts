import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicHeaderNotificationComponent } from './basic-header-notification/basic-header-notification.component';
import { TranslocoModule } from '@jsverse/transloco';
import { NotificationUseCaseProvider } from '../../../../core/notification/infrastructure/providers/notification-usecase-provider';
import { Notification } from '../../../../core/notification/domain/notification.model';
import { StructureNotificationComponent } from './structure-notification/structure-notification.component';


@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink, TranslocoModule, StructureNotificationComponent],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent {
  
  private notificationUseCase = inject(NotificationUseCaseProvider)
  public structure: Notification[] = [];

  ngOnInit(): void {

    this.notificationUseCase.usecase.getNotificationByParams('?page=0&perPage=0')
      .subscribe(notifications => {
        this.structure.push(...notifications);

  });
 }

  public clearNotifications(): void {
    this.structure = []; 
  }
}



