import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicHeaderNotificationComponent } from '../../components/basic-header-notification/basic-header-notification.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink, TranslocoModule],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent {

}
