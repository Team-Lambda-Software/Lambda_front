import { Component, OnInit, inject } from '@angular/core';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { CoursesPopularService } from '../../../services/courses/getPopulars/courses-popular.service';
import { ICourse } from '../../../interfaces/course-model';
import { ILittleCard } from '../../../interfaces/ILittleCard';
import { LitleCardComponent } from '../../../components/litle-card/litle-card.component';
import { CourseLitleCardAdapter } from '../../../adapters/LitleCardAdapter';

@Component({
  selector: 'app-main-course',
  standalone: true,
  imports: [BasicHeaderComponent, LitleCardComponent],
  templateUrl: './main-course.component.html',
  styleUrl: './main-course.component.css'
})
export class MainCourseComponent implements OnInit {

  public popularService = inject(CoursesPopularService);

  public logoPath = 'assets/icons/app-logo.svg'

  public course: ICourse = {
      id: '1',
      category: 'Yoga for beginners',
      description: 'Learn the basics of yoga and improve your health. No previous experience required.',
      image: 'https://th.bing.com/th/id/OIP.SnvRMcxWJe_FhErVZHtB2QHaEo?rs=1&pid=ImgDetMain',
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

    adaptCourseToLittleCard(course: ICourse): ILittleCard {
      return CourseLitleCardAdapter(course);
    }

}
