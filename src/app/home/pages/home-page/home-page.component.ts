import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';
import { CircularProgressComponent } from '../../components/circular-progress/circular-progress.component';


interface ICategories {
  id: number;
  image: string;
}

interface IPopularCourses {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

interface IVideoCourses {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

interface ILatestBlogs {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule, CarruselBgImgComponent, TranslocoModule, CircularProgressComponent]
})

export class HomePageComponent {
 
  public popularCourses: IPopularCourses[] = [
    { id: 1, teacher: 'Cesar', category: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: 2, teacher: 'Carlos', category: 'Cycling' , image: 'https://via.placeholder.com/250' },
    { id: 3, teacher: 'Gustavo', category: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: 4, teacher: 'Carlos', category: 'Yoga' , image: 'https://via.placeholder.com/250' },

  ]

  public videoCourses: IVideoCourses[]  = [
    {
      id: 1,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 2,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 3,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 4,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/250',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    }
  ];

  public latestBlogs: ILatestBlogs[]  = [
    { id: 1, name: 'New Yoga Exercises', description: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Try This New Technique!', description: 'Cycling' , image: 'https://via.placeholder.com/250' },
  ];

  public catNames: ICategories[] = [
    { id: 1,  image: 'https://via.placeholder.com/69' },
    { id: 2,  image: 'https://via.placeholder.com/69' },
    { id: 3,  image: 'https://via.placeholder.com/69' },
    { id: 4,  image: 'https://via.placeholder.com/69' },
    { id: 5,  image: 'https://via.placeholder.com/69' },
  ];

}