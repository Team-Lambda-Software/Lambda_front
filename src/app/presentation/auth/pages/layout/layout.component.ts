import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from '../../../../core/user/domain/interfaces/auth-status.enum';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AuthLoadingStore } from '../../../../core/user/infraestructure/auth-loading-store';
import {toSignal} from '@angular/core/rxjs-interop'

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
  public AuthLoadingStore=AuthLoadingStore.getInstance();
  public UserStatus= toSignal(this.AuthLoadingStore.getObservable())
  public finishedAuthCheck= computed<boolean>(()=>{
    if (this.UserStatus()===AuthStatus.checking) return false
    return true
  })
 }
