import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from '../../../../../core/notification/domain/notification.model';

@Component({
  selector: 'app-structure-detail',
  standalone: true,
  imports: [],
  templateUrl: './structure-detail.component.html',
  styleUrl: './structure-detail.component.css'
})
export class StructureDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<StructureDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification,
  ) {}

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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
