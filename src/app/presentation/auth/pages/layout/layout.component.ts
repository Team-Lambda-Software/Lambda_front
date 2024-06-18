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
  public UserStatus=signal<AuthStatus>(this.userStatusService.currentStatus())
  public finishedAuthCheck= computed<boolean>(()=>{
    console.log(this.userStatusService.currentStatus());
    if (this.UserStatus()===AuthStatus.checking) return false
    return true
  })

  public authStatusChangeEffect= effect(()=>{
    let lastLink=this.router.url
    console.log('effect',this.userStatusService.currentStatus());

    console.log(lastLink);
      switch(this.userStatusService.currentStatus()){
        case AuthStatus.checking:
          return;
        case AuthStatus.authenticated:{
          this.router.navigateByUrl(lastLink)
          return
        }
      }
  })
 }
