import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found-page/not-found.component';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/isNotAuthenticated.guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: ()=> import('./auth/auth.routes').then((routes) => routes.AuthRoutes)
  },
  {
    path: 'home',
    canActivate:[isAuthenticatedGuard],
    loadChildren: ()=> import('./home/home.routes').then((routes) => routes.HomeRoutes)
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
