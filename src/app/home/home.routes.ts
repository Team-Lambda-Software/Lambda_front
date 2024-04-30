import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        component: HomePageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      },
    ]
  }
]
