import { Component, inject, OnInit } from '@angular/core';
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
import { VideoCoursesComponent } from './components/video-courses/video-courses.component';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { ProgressTrendingUseCaseInfraestructure } from '../../../../core/progress/infraestructure/providers/progress-trending-use-case';
import { ProgressTrending } from '../../../../core/progress/application/interfaces/dto/progress-trending.interface';
import { Optional } from '../../../../common/helpers/Optional';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { Result } from '../../../../common/helpers/Result';

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
    BlogsComponent,
    VideoCoursesComponent
  ]
})

export class HomePageComponent implements OnInit{
  ngOnInit(): void {
    this.user = this.userStatusService.currentUser();
    this.progressTrendingUseCase.usecase.execute().subscribe({
      next:(value)=>{
        if(!value.isError()) this.progressTrending={...value.getValue()}
        else this.popupService.displayErrorModal(value.getError().message)
      },
      error:(error:Result<Error>)=>{
      }
    })

  }

  public popularService = inject(CoursesPopularService);
  public userInfo = inject(UserInfoService);
  public userStatusService = inject(UserStatusService)
  private popupService=inject(PopupInfoModalService)
  public user = this.userStatusService.currentUser();
  public progressTrending:ProgressTrending={
    Percent: 0,
    courseTitle: 'No course',
    courseId: 'No course Id',
    lastTime: new Date()
  }
  public progressTrendingUseCase=inject(ProgressTrendingUseCaseInfraestructure)

}
