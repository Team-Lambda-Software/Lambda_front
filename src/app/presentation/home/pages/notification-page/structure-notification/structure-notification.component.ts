import { Component, inject, Input } from '@angular/core';
import { BasicHeaderNotificationComponent } from '../../../components/basic-header-notification/basic-header-notification.component';
import { RouterLink } from '@angular/router';
import { NotificationUseCaseProvider } from '../../../../../core/notification/infrastructure/providers/notification-usecase-provider';
import { Notification } from '../../../../../core/notification/domain/notification.model';


@Component({
  selector: 'app-structure-notification',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink],
  templateUrl: './structure-notification.component.html',
  styleUrl: './structure-notification.component.css'
})

export class StructureNotificationComponent {
  @Input({required:true})
  public structure: Notification[] = [];
  }
  

