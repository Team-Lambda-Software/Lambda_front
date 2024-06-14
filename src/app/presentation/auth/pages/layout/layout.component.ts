import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from '../../../../core/user/domain/interfaces/auth-status.enum';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { LoadingStore } from '../../interfaces/loading-store';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true,
  imports: [ RouterOutlet ,LoaderComponent]
})

export class LayoutComponent {
  public router=inject(Router)
  public lastLink=this.router.url
  public loadingStore=LoadingStore.getInstance().getObservable();
  public userStatusService=inject(UserStatusService)
  public userStatus=signal<AuthStatus>(this.userStatusService.currentStatus())
  public finishedAuthCheck= computed<boolean>(()=>{
    console.log('computed',this.userStatus());


    if (this.userStatusService.currentStatus()===AuthStatus.checking) return false
    return true
  })
  public authStatusChangeEffect= effect(()=>{
    this.lastLink=this.router.url

    switch(this.userStatusService.currentStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:{
        return
      }
      case AuthStatus.notAuthenticated:
      {
        return
      }
    }
  })
 }
