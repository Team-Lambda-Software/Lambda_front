import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  Routes,
  withInMemoryScrolling
} from '@angular/router';
import { NotFoundComponent } from './presentation/shared/pages/not-found-page/not-found.component';
import { isNotAuthenticatedGuard } from './presentation/auth/guards/isNotAuthenticated.guard';
import { isAuthenticatedClientGuard } from './presentation/auth/guards/isAuthenticatedClient.guard';
import { isAuthenticatedAdminGuard } from './presentation/auth/guards/isAuthenticatedAdmin.guard';

export const routes: Routes = [
  {
    // TODO OJO esto cambiarlo admin por auth
    path:'',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: ()=> import('./presentation/auth/auth.routes').then((routes) => routes.AuthRoutes)
  },
  {
    path: 'home',
    canActivate:[isAuthenticatedClientGuard],
    loadChildren: ()=> import('./presentation/home/home.routes').then((routes) => routes.HomeRoutes)
  },
  {
    path: 'admin',
    //canActivate:[isAuthenticatedAdminGuard],
    loadChildren: ()=> import('./presentation/admin/admin.routes').then((routes) => routes.AdminRoutes)
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

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  //anchorScrolling: 'enabled',
};

export const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);
