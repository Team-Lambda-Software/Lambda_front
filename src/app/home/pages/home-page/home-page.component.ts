import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';
import { CircularProgressComponent } from '../../components/circular-progress/circular-progress.component';
import { ILittleCard } from '../../interfaces/ILittleCard';
import { CourseLitleCardAdapter } from '../../adapters/LitleCardAdapter';
import { CoursesPopularService } from '../../services/courses/getPopulars/courses-popular.service';
import { IYogaCategories } from '../../interfaces/yoga-categories-model';
import { IVideoCourses } from '../../interfaces/video-courses-model';
import { ILatestBlogs } from '../../interfaces/latest-blogs-model';
import { IUserInfo } from '../../interfaces/user-info-model';
import { UserInfoService } from '../../services/user/getUserInfo/user-info.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule, CarruselBgImgComponent, TranslocoModule, CircularProgressComponent]
})

export class HomePageComponent {

  public popularService = inject(CoursesPopularService);
 
  public getPopulars(): ILittleCard[] {
    let popular = this.popularService.getPopulars();
    return popular.map((course) => CourseLitleCardAdapter(course));
  }

  public userInfo =inject(UserInfoService);

  public getUserInfo(): IUserInfo {
    let info = this.userInfo.getUserInfo();
    return info;
  }

  public videoCourses: IVideoCourses[]  = [
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

  public latestBlogs: ILatestBlogs[]  = [
    { id: '555661cv-dddsf', name: 'New Yoga Exercises', description: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: '555661cv-dddsg', name: 'Try This New Technique!', description: 'Cycling' , image: 'https://via.placeholder.com/250' },
  ];

  public catNames: IYogaCategories[] = [
    { id: '555661cv-dddsh',  image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsi',  image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsj',  image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsk',  image: 'https://via.placeholder.com/69' },
    { id: '555661cv-dddsl',  image: 'https://via.placeholder.com/69' },
  ];

}