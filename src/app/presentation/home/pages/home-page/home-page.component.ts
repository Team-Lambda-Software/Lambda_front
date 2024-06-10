import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CoursesPopularService } from '../../services/courses/getPopulars/courses-popular.service';
import { UserInfoService } from '../../services/user/getUserInfo/user-info.service';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';
import { CircularProgressComponent } from '../../components/circular-progress/circular-progress.component';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { SquareSkeletonComponent } from '../../../shared/components/square-skeleton/square-skeleton.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PopularCoursesComponent } from './components/popular-courses/popular-courses.component';
import { IVideoCourses } from '../../interfaces/video-courses-model';
import { IUser } from '../../interfaces/user-info-model';
import { IPlayerCard } from '../../interfaces/IPlayerCard';
import { PlayerCardAdapter } from '../../adapters/PlayerCardAdapter';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user-state.interface';
import { Optional } from '../../../shared/helpers/Optional';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    CarruselBgImgComponent,
    TranslocoModule,
    CircularProgressComponent,
    PlayerCardComponent,
    SquareSkeletonComponent,
    CategoriesComponent,
    PopularCoursesComponent,
    BlogsComponent
  ]
})

export class HomePageComponent {

  public popularService = inject(CoursesPopularService);
  public userInfo = inject(UserInfoService);
  public auth = inject(AuthService)
  public user = new Optional(this.auth.currentUser())

}
