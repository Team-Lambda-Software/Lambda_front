import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';

interface IPopularCourses {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule, CarruselBgImgComponent]
})

export class HomePageComponent { 

  public days: string[] = ['Tomorrow', 'Today', 'Yesterday'];
  public selectedDays: string = 'Today';
  public popularCourses: IPopularCourses[] = [
    { id: 1, teacher: 'Eduardo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 2, teacher: 'Paul', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 3, teacher: 'Alfredo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 4, teacher: 'Eduardo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },

  ]

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if(params['day']) {
        this.setSelectedDays(params['day']);
      }
    });
  }

  onDaySelected(days: string) {
    // console.log('Day selected: ', day);
    this.router.navigate([] ,{queryParams: {days: days}, queryParamsHandling: 'merge'});
    this.setSelectedDays(days);
  }

  setSelectedDays(days: string) {
    this.selectedDays = days;
  }
}
