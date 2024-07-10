import { Component, inject, Input } from '@angular/core';
import { BasicHeaderNotificationComponent } from '../basic-header-notification/basic-header-notification.component';
import { RouterLink, Router } from '@angular/router';
import { Notification } from '../../../../../core/notification/domain/notification.model';
import { MatDialog } from '@angular/material/dialog';
import { StructureDetailComponent } from '../structure-detail/structure-detail.component';
import { NotificationUseCaseProvider } from '../../../../../core/notification/infrastructure/providers/notification-usecase-provider';
import { Location } from '@angular/common';


@Component({
  selector: 'app-structure-notification',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink,StructureDetailComponent],
  templateUrl: './structure-notification.component.html',
  styleUrl: './structure-notification.component.css'
})

export class StructureNotificationComponent {
  @Input({required:true})
  public structure: Notification[] = [];
  private notificationUseCase = inject (NotificationUseCaseProvider)
  constructor(public dialog: MatDialog, private location: Location) {}

  openDialog(st: Notification): void {
    this.notificationUseCase.usecase.getNotificationById(st.id)
      .subscribe((notification) => {
        const dialogRef = this.dialog.open(StructureDetailComponent, {
          width: '250px',
          data: notification,
      });
      st.userReaded=true

        dialogRef.afterClosed().subscribe(() => {
          this.location.replaceState(this.location.path());
      });
    });
  }

  formatearFecha(fecha: Date | string | null): string {
    if (fecha instanceof Date) {
      const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return fecha.toLocaleDateString('es-ES', opciones);
    } else if (typeof fecha === 'string') {
      const fechaObjeto = new Date(fecha);
      return this.formatearFecha(fechaObjeto);
    } else {
      return 'Fecha no válida';
    }
  }
}

