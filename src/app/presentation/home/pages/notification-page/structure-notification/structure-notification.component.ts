import { Component, Input } from '@angular/core';
import { BasicHeaderNotificationComponent } from '../../../components/basic-header-notification/basic-header-notification.component';
import { RouterLink } from '@angular/router';
import { NotificationApiService } from '../../../../../core/notification/infrastructure/services/notification-api.service';

interface StructureNotification {
  title: string;
  body: string;
  date: string;
}

@Component({
  selector: 'app-structure-notification',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink],
  templateUrl: './structure-notification.component.html',
  styleUrl: './structure-notification.component.css'
})
export class StructureNotificationComponent {
  //public NotificationApiService = new NotificationApiService();
  public structure: StructureNotification[] = [];

  ngOnInit(): void {
    this.structure.push({
      title: "Soy el titulo",
      body: "Soy la descripcion mas fachera de la vida Siuuuuuuuu",
      date: "23-10-2024"
    });

    this.structure.push({
      title: "Soy el titulo",
      body: "Soy la descripcion mas fachera de la vida Siuuuuuuuu",
      date: "22-11-2024"
    });
  }

  /*NotificationApiService.getNotificationByParams('?page=0&perPage=0')
  .subscribe(notifications => {
    // Hacer push de los datos obtenidos a la estructura
    this.structure.push(...notifications);
  });*/
  
}

