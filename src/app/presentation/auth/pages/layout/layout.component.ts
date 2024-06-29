import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, EventType, Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from '../../../../core/user/domain/enum/auth-status.enum';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AuthLoadingStore } from '../../../../core/user/infraestructure/auth-loading-store';
import {toSignal} from '@angular/core/rxjs-interop'
import { filter } from 'rxjs';
import { IRouterRepository } from '../../../../core/shared/application/ports/IRouterRepository.interface';
import { routerLocalStorageRepository } from '../../../../core/shared/infraestructure/local-storage/router-local-storage.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true,
  imports: [ RouterOutlet ,LoaderComponent]
})

export class LayoutComponent implements OnInit{

  private AuthLoadingStore=AuthLoadingStore.getInstance();
  private UserStatus= toSignal(this.AuthLoadingStore.getObservable())
  public finishedAuthCheck= computed<boolean>(()=>{
    if (this.UserStatus()===AuthStatus.checking) return false
    return true
  })
  private _routerRepository:IRouterRepository= new routerLocalStorageRepository()
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event.type===EventType.NavigationEnd)
    ).subscribe((event) => {
      if(event.type===EventType.NavigationEnd){
        this._routerRepository.saveLastLink(event.url)
      }
    });}
 }
