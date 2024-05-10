import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { MainCourseComponent } from './pages/courses-pages/main-course/main-course.component';
import { VideoListComponent } from './pages/courses-pages/video-list/video-list.component';
import { PlayerVideoComponent } from './pages/courses-pages/player-video/player-video.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TrainingPageComponent } from './pages/courses-pages/training-page/training-page.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { StructureNotificationComponent } from './pages/notification-page/structure-notification/structure-notification.component';

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
      {
        path: 'main-course',
        component: MainCourseComponent
      },
      {
        path: 'video-list',
        component: VideoListComponent
      },
      {
        path: 'player-video',
        component: PlayerVideoComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: 'training',
        component: TrainingPageComponent
      },
      {
        path: 'notification',
        component: NotificationPageComponent
      },
      {
        path: 'notifications',
        component: StructureNotificationComponent
      }
    ]
  }
]
