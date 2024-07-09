import { 
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  Routes,
  withInMemoryScrolling 
} from '@angular/router';
import { NotFoundComponent } from './presentation/shared/pages/not-found-page/not-found.component';
import { isAuthenticatedGuard } from './presentation/auth/guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from './presentation/auth/guards/isNotAuthenticated.guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: ()=> import('./presentation/auth/auth.routes').then((routes) => routes.AuthRoutes)
  },
  {
    path: 'home',
    //canActivate:[isAuthenticatedGuard],
    canActivate:[isNotAuthenticatedGuard],
    //loadChildren: ()=> import('./presentation/home/home.routes').then((routes) => routes.HomeRoutes)
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
