import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

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
  @Output() notifyClear: EventEmitter<void> = new EventEmitter<void>();

  public emitClearEvent(): void {
    this.notifyClear.emit();
  }
  

}
