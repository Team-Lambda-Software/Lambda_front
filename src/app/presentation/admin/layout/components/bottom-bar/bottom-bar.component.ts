import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationUseCaseProvider } from '../../../../../core/notification/infrastructure/providers/notification-usecase-provider';
import { DarkModeService } from '../../../../shared/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css'
})
export class BottomBarComponent {
  pruebaCount?:number;
  notificationCount?:number;
  public darkModeService = inject(DarkModeService)
  private notificationUseCase = inject(NotificationUseCaseProvider) 

  ngOnInit(): void {
    
    /*this.notificationUseCase.usecase.getNotificationCountNotRead().subscribe(
      (count: number) => { this.notificationCount = count; },
      (error) => {
        console.error('Error al obtener el recuento de notificaciones:', error);
      }
    );*/

  }
  
}
