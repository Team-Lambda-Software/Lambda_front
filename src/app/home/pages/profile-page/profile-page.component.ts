import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';

interface IPopularCourses {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
  standalone: true,
  imports: [ RouterLink, CommonModule, CarruselBgImgComponent, TranslocoModule]
})
export class ProfilePageComponent {

  public popularCourses: IPopularCourses[] = [
    { id: 1, teacher: 'Cesar', category: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: 2, teacher: 'Carlos', category: 'Cycling' , image: 'https://via.placeholder.com/250' },
    { id: 3, teacher: 'Gustavo', category: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: 4, teacher: 'Carlos', category: 'Yoga' , image: 'https://via.placeholder.com/250' },

  ]

 }
