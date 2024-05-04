import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ProgramsTagComponent } from '../../../components/programs-tag/programs-tag.component';
import { CarruselBgImgComponent } from '../../../components/carrusel-bg-img/carrusel-bg-img.component';

interface IPopularCourse {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

interface IProgram{
  id: number;
  name: string;
  teacher: string;
  level: number;
  image: string;
}

@Component({
  selector: 'app-training-page',
  standalone: true,
  imports: [RouterLink, CommonModule, ProgramsTagComponent, CarruselBgImgComponent ,TranslocoModule],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.css'
})
export class TrainingPageComponent {
  
  public levels: string[] = ['Master', 'Skilled', 'Beginner'];
  public selectedLevel: string = 'Master';
  public popularCourses: IPopularCourse[] = [
    { id: 1, teacher: 'Eduardo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 2, teacher: 'Paul', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 3, teacher: 'Alfredo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 4, teacher: 'Eduardo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },

  ]
  public programs: IProgram[] = [
    { id: 1, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250'},
    { id: 3, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250' },
    { id: 4, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250' }
  ];

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if(params['level']) {
        this.setSelectedLevel(params['level']);
      }
    });
  }

  onLevelSelected(level: string) {
    // console.log('Level selected: ', level);
    this.router.navigate([] ,{queryParams: {level: level}, queryParamsHandling: 'merge'});
    this.setSelectedLevel(level);
  }

  setSelectedLevel(level: string) {
    this.selectedLevel = level;
  }
}
