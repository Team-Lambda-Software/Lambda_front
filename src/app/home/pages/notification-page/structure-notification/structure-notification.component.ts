import { Component, Input } from '@angular/core';
import { BasicHeaderNotificationComponent } from '../../../components/basic-header-notification/basic-header-notification.component';
import { RouterLink } from '@angular/router';

interface StructureNotification {
  titulo: string;
  descripcion: string;
  fecha: string;
}

@Component({
  selector: 'app-structure-notification',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink],
  templateUrl: './structure-notification.component.html',
  styleUrl: './structure-notification.component.css'
})
export class StructureNotificationComponent {

  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() fecha!: Date;

  public structure: StructureNotification[] = [];

  ngOnInit(): void {
    // Esta parte hay que revisarla cuando se haga la comunicacion con el backend
    /*this.structure.push({
      titulo: this.titulo,
      descripcion: this.descripcion,
      fecha: this.formatearFecha(this.fecha)
    });
    */
    // Recordatorio: eliminar esto dos push cuando se haya realizado la comunicacion con el backend :D
    this.structure.push({
      titulo: "Soy el titulo",
      descripcion: "Soy la descripcion mas fachera de la vida Siuuuuuuuu",
      fecha: this.formatearFecha(new Date)
    });

    this.structure.push({
      titulo: "Soy el titulo",
      descripcion: "Soy la descripcion mas fachera de la vida Siuuuuuuuu",
      fecha: this.formatearFecha(new Date)
    });
  }

  // Método para formatear la fecha recibida
  formatearFecha(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long', 
      hour: 'numeric',
      minute: 'numeric', 
      hour12: true 
    };
    // Formato '10 de mayo de 2024, 5:11 PM'
    return fecha.toLocaleDateString('es-ES', opciones);
  }
}

