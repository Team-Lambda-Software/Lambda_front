import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStatus } from '../../interfaces/auth-status.enum';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true,
  imports: [ RouterOutlet ,LoaderComponent]
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
