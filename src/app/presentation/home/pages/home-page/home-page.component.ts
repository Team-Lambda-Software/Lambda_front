import { AfterContentChecked, AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';
import { CircularProgressComponent } from '../../components/circular-progress/circular-progress.component';
import { ILittleCard } from '../../interfaces/ILittleCard';
import { CourseToILittleCard, PartialCourseToILittleCard } from '../../adapters/LitleCardAdapter';
import { CoursesPopularService } from '../../services/courses/getPopulars/courses-popular.service';
import { IYogaCategories } from '../../interfaces/yoga-categories-model';
import { IVideoCourses } from '../../interfaces/video-courses-model';
import { ILatestBlogs } from '../../interfaces/latest-blogs-model';
import { IUser } from '../../interfaces/user-info-model';
import { UserInfoService } from '../../services/user/getUserInfo/user-info.service';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { PlayerCardAdapter } from '../../adapters/PlayerCardAdapter';
import { IPlayerCard } from '../../interfaces/IPlayerCard';
import { Observable, finalize, map, of } from 'rxjs';
import { CourseUsecaseProvider } from '../../../../core/course/infrastructure/providers/course-usecase-provider';
import { SquareSkeletonComponent } from '../../../shared/components/square-skeleton/square-skeleton.component';
import { Category } from '../../../../core/categories/domain/category.model';
import { CategoyUsecaseProvider } from '../../../../core/categories/infrastructure/providers/category-usecase-provider';
import { BlogUsecaseProvider } from '../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { BlogAdapter } from '../../adapters/BlogAdapter';

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
    SquareSkeletonComponent
  ]
})

export class HomePageComponent implements OnInit {

  private courseUseCaseService = inject(CourseUsecaseProvider);
  private categoryUseCaseService = inject(CategoyUsecaseProvider);
  private blogUseCaseService = inject(BlogUsecaseProvider);
  public popularService = inject(CoursesPopularService);
  public userInfo = inject(UserInfoService);
  public isLoadingPopulars = false;
  public isLoadingCategories = false;
  public isLoadingBlogs = false;


  public videoCourses: IVideoCourses[] = [
    {
      id: '555661cv-dddsb',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: '555661cv-dddsc',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: '555661cv-dddsd',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: '555661cv-dddse',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    }
  ];

  public latestBlogs: ILatestBlogs[] = [];

  public catNames: IYogaCategories[] = [
    { id: '555661cv-dddsh', image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsi', image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsj', image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsk', image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsl', image: 'https://via.placeholder.com/69' },
  ];

  public categories: Category[] = [];
  public popularCourses: ILittleCard[] = [];
  public blogs: ILittleCard[] = [];

  ngOnInit(): void {
    this.getPopulars();
    this.getCategories();
    this.getBlogs('?filter=RECENT');
  }

  public getPopulars(): void {
    this.isLoadingPopulars = true
    this.courseUseCaseService.usecase.getCoursesByParams('?filter=POPULAR')
      .pipe(
        map(courses => courses.map(PartialCourseToILittleCard)),
        finalize(() => this.isLoadingPopulars = false),
      ).subscribe(pc => this.popularCourses = pc)
  }

  public getCategories(params?: string) {
    this.isLoadingCategories = true
    this.categoryUseCaseService.usecase.getByParams(params ?? '')
      .pipe(finalize(() => this.isLoadingCategories = false))
      .subscribe(c => this.categories = c)
  }

  public getBlogs(params?: string) {
    this.isLoadingBlogs = true;
    this.blogUseCaseService.usecase.getByParams(params ?? '')
      .pipe(
        map(b => b.map(BlogAdapter)),
        finalize(() => this.isLoadingBlogs = false)
      )
      .subscribe(c => this.latestBlogs = c)
  }

  public getUserInfo(): IUser {
    let info = this.userInfo.getUserInfo();
    return info;
  }

  public adaptToPlayerCard(data: IVideoCourses): IPlayerCard {
    return PlayerCardAdapter(data)
  }

}