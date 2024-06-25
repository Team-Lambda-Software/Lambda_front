import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NotificationUseCaseProvider } from '../../../../../core/notification/infrastructure/providers/notification-usecase-provider';

interface BasicHeaderNotificationOptions {
  redirect: string;
  name: string;
  inbox: number;
}
@Component({
  selector: 'app-basic-header-notification',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './basic-header-notification.component.html',
  styleUrl: './basic-header-notification.component.css'
})
export class BasicHeaderNotificationComponent {

  @Input({ required: true }) public options!: BasicHeaderNotificationOptions
  private notificationUseCase = inject (NotificationUseCaseProvider)
  
  borrarNotificaciones(): void {
    this.notificationUseCase.usecase.deleteAllNotifications().subscribe(
    );
  }
}
