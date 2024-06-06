import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { TranslocoModule } from '@jsverse/transloco';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { CourseUsecaseProvider } from '../../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { finalize, map } from 'rxjs';
import { PartialCourseToILittleCard } from '../../../../adapters/LitleCardAdapter';
import { CarruselBgImgComponent } from '../../../../components/carrusel-bg-img/carrusel-bg-img.component';

@Component({
  selector: 'app-popular-courses',
  standalone: true,
  imports: [
    RouterLink,
    SquareSkeletonComponent,
    TranslocoModule,
    CarruselBgImgComponent
  ],
  templateUrl: './popular-courses.component.html',
  styleUrl: './popular-courses.component.css'
})
export class PopularCoursesComponent implements OnInit {
  
  private courseUseCaseService = inject(CourseUsecaseProvider);
  public popularCourses: ILittleCard[] = [];
  public isLoadingPopularCourses = false;


  ngOnInit(): void {
    this.getPopulars();
  }

  public getPopulars(): void {
    this.isLoadingPopularCourses = true
<<<<<<< HEAD
    this.courseUseCaseService.usecase.getPopularCourses()
=======
    this.courseUseCaseService.usecase.getCoursesByParams('?filter=POPULAR&perPage=5')
>>>>>>> 089ac98da2957ee8b1291a8fe445cb8bbe6a3658
      .pipe(
        map(courses => courses.map(PartialCourseToILittleCard)),
        finalize(() => this.isLoadingPopularCourses = false),
      ).subscribe(pc => this.popularCourses = pc)
  }
}
