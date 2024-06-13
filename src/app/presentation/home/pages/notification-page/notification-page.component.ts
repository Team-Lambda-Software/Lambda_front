import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicHeaderNotificationComponent } from '../../components/basic-header-notification/basic-header-notification.component';
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
    this.structure.push({
      title: "Soy el titulo",
      body: "Soy la descripcion mas fachera de la vida Siuuuuuuuu",
      date: "23-10-2024",
    });

    this.structure.push({
      title: "Soy el titulo",
      body: "Soy la descripcion mas fachera de la vida Siuuuuuuuu",
      date: "22-11-2024"
    });

    this.notificationUseCase.usecase.getNotificationByParams('?page=0&perPage=0')
      .subscribe(notifications => {
        this.structure.push(...notifications);

  });

}
}
