import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

interface BasicHeaderNotificationOptions {
  redirect: string;
  name: string;
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

}
