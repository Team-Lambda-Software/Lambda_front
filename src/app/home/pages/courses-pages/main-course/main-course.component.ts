import { Component, OnInit, inject } from '@angular/core';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { CoursesPopularService } from '../../../services/courses/getPopulars/courses-popular.service';
import { ICourse } from '../../../interfaces/course-model';
import { ILittleCard } from '../../../interfaces/ILittleCard';
import { CourseLitleCardAdapter } from '../../../adapters/LitleCardAdapter';

@Component({
  selector: 'app-main-course',
  standalone: true,
  imports: [BasicHeaderComponent],
  templateUrl: './main-course.component.html',
  styleUrl: './main-course.component.css'
})
export class MainCourseComponent implements OnInit {

  public popularService = inject(CoursesPopularService);

  public logoPath = 'assets/icons/app-logo.svg'

  public courses: ICourse = {
      id: '1',
      category: 'Yoga for beginners',
      description: 'Learn the basics of yoga and improve your health. No previous experience required.',
      image: 'https://via.placeholder.com/250/0',
      level: 1,
      weeks: 4,
      mins: 16,
      instructor: 'Carlos'
    };

    constructor() {}

    ngOnInit(): void {}

    public getPopulars(): ILittleCard[] {
      let populars = this.popularService.getPopulars();
      return populars.map((course) => CourseLitleCardAdapter(course));
    }

}
