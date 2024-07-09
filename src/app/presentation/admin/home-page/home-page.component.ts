import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../shared/services/dark-mode/dark-mode.service';
import { LogoutUseCaseService } from '../../../core/user/application/logout-use-case.service';
import { AuthLocalStorageService } from '../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { UserStatusService } from '../../../core/user/infraestructure/services/user-status.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ]
})

export class HomePageComponent {

  public darkModeService = inject(DarkModeService);
  private userStatus=inject(UserStatusService)
  private logOutUseCase= new LogoutUseCaseService(new AuthLocalStorageService(),this.userStatus)
  private router= inject(Router)
  public user=this.userStatus.currentUser()

  logout() {
    this.logOutUseCase.execute();
    this.router.navigate(['/auth'])
  }

}
