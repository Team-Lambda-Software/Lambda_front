import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { ProgramsTagComponent } from '../../components/programs-tag/programs-tag.component';
import { CardCarruselComponent } from '../../components/card-carrusel/card-carrusel.component';

interface ICategory {
  id: number;
  name: string;
}

interface ICourse {
  id: number;
  name: string;
  category: string;
  date: string;
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
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterLink, BasicHeaderComponent, ProgramsTagComponent, CardCarruselComponent, TranslocoModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public categories: ICategory[] = [
    { id: 1, name: 'Prenatal' },
    { id: 2, name: 'For Women' },
    { id: 3, name: 'Trainning'},
    { id: 4, name: 'Courses'},
    { id: 5, name: 'Videos'},
    { id: 6, name: 'Morning'},
    { id: 7, name: 'Yoga'},
    { id: 8, name: 'Restorative'},
    { id: 9, name: 'Recent Posts'},
    { id: 10, name: 'Most Popular'}
  ];

  public popularCourses: ICourse[] = [
    { id: 1, name: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , image: 'https://via.placeholder.com/250' },
    { id: 3, name: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , image: 'https://via.placeholder.com/250' },
    
  ];

  public programs: IProgram[] = [
    { id: 1, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250'},
    { id: 3, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250' },
    { id: 4, name: 'Prenatal Yoga', teacher: 'Megan', level: 1, image: 'https://via.placeholder.com/250' }
  ];
}
