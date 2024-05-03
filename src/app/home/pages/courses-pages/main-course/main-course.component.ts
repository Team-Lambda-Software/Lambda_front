import { Component } from '@angular/core';
import { BasicHeaderComponent } from '../../../../shared/components/basic-header/basic-header.component';

interface ICourse{
  category: string;
  description: string;
  image: string;
  level: number;
  weeks: number;
  mins: number;
  teacher: string;
}


interface IPopularCourse {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-main-course',
  standalone: true,
  imports: [BasicHeaderComponent],
  templateUrl: './main-course.component.html',
  styleUrl: './main-course.component.css'
})
export class MainCourseComponent {

  public logoPath = 'assets/icons/app-logo.svg'

  public courses: ICourse = {
      category: 'Yoga for beginners',
      description: 'Learn the basics of yoga and improve your health. No previous experience required.',
      image: 'https://via.placeholder.com/250/0',
      level: 1,
      weeks: 4,
      mins: 16,
      teacher: 'Carlos'
    };
  
    public popularCourses: IPopularCourse[] = [
      { id: 1, teacher: 'Eduardo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
      { id: 2, teacher: 'Paul', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
      { id: 3, teacher: 'Alfredo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
      
    ];
}
