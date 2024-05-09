import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStatus } from '../../interfaces/auth-status.enum';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true,
  imports: [ RouterOutlet ]
})

export class LayoutComponent {
  public authService=inject(AuthService)
  public router=inject(Router)
  public lastLink=this.router.url
  public finishedAuthCheck= computed<boolean>(()=>{
    if (this.authService.authStatus()===AuthStatus.checking) return false
    return true
  })
  public authStatusChangeEffect= effect(()=>{
    this.lastLink=this.router.url
    console.log(this.lastLink);

    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:{
        this.router.navigateByUrl('/home')
        return
      }
      case AuthStatus.notAuthenticated:
      {
        if (this.authService.hasError) this.router.navigateByUrl(this.lastLink)
        return
        // this.router.navigateByUrl('/auth')
      }
    }
  })
 }
