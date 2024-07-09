import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { NgClass } from '@angular/common';
import { routerLocalStorageRepository } from '../../../core/shared/infraestructure/local-storage/router-local-storage.service';
import { IRouterRepository } from '../../../core/shared/application/ports/IRouterRepository.interface';

@Component({
  standalone: true,
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [
    RouterOutlet,
    NgClass
  ]
})

export class LayoutComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  public subscriber?: Subscription;
  public isBottombarActive = signal<boolean>(false);
  constructor(private router: Router) { }
  private _routerRepository:IRouterRepository= new routerLocalStorageRepository()

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

}
