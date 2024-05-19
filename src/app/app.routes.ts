import { Routes } from '@angular/router';
import { NotFoundComponent } from './presentation/shared/pages/not-found-page/not-found.component';
import { isAuthenticatedGuard } from './presentation/auth/guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from './presentation/auth/guards/isNotAuthenticated.guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: ()=> import('./presentation/auth/auth.routes').then((routes) => routes.AuthRoutes)
  },
  {
    path: 'home',
    canActivate:[isAuthenticatedGuard],
    loadChildren: ()=> import('./presentation/home/home.routes').then((routes) => routes.HomeRoutes)
  },
  {
    path: '404-not-found',
    component: NotFoundComponent
  },
  {
    path:'**',
    redirectTo:'404-not-found'
  }
];
