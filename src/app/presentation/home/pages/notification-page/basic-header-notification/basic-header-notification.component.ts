import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NotificationUseCaseProvider } from '../../../../../core/notification/infrastructure/providers/notification-usecase-provider';
import { PopupInfoModalService } from '../../../../shared/services/popup-info-modal/popup-info-modal.service';

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

  private popupService=inject(PopupInfoModalService)
  public notificationDeleteAll='All your notifications were deleted'


  @Input({ required: true }) public options!: BasicHeaderNotificationOptions
  private notificationUseCase = inject (NotificationUseCaseProvider)

  borrarNotificaciones(): void {
    if (this.options.inbox === 0) return;
    this.popupService.displayInfoModal(this.notificationDeleteAll)
    this.notificationUseCase.usecase.deleteAllNotifications().subscribe({
      next: () => {
        // Recargar la página después de borrar las notificaciones
        window.location.reload();
      },
      error: (error) => {
        this.popupService.displayErrorModal("Error deleting notifications")
      }
    });

  }
}
