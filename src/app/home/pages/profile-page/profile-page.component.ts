import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';


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
  imports: [ RouterLink, CommonModule, CarruselBgImgComponent, TranslocoModule, NgxChartsModule]
})
export class ProfilePageComponent {

  chartData = [
    {
      name: 'Mon',
      value: 100
    },
    {
      name: 'Tue',
      value: 200
    },
    {
      name: 'Wed',
      value: 150
    },
    {
      name: 'Thu',
      value: 300
    },
    {
      name: 'Fri',
      value: 250
    },
    {
      name: 'Sat',
      value: 180
    },
    {
      name: 'Sun',
      value: 220
    }
  ];

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4F14A0', '#27AE60']
  };

  onBarSelect(event: any) {
    console.log(event);
  }

  public popularCourses: IPopularCourses[] = [
    { id: 1, teacher: 'Cesar', category: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: 2, teacher: 'Carlos', category: 'Cycling' , image: 'https://via.placeholder.com/250' },
    { id: 3, teacher: 'Gustavo', category: 'Yoga' , image: 'https://via.placeholder.com/250' },
    { id: 4, teacher: 'Carlos', category: 'Yoga' , image: 'https://via.placeholder.com/250' },

  ]

  

 }
