import { Component, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { CardCarruselComponent } from '../../../../components/card-carrusel/card-carrusel.component';
import { CourseUsecaseProvider } from '../../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { ICard } from '../../../../interfaces/ILittleCard';
import { PopularCourseCardAdapter } from '../../../../adapters/CardAdapter';
import { finalize, map } from 'rxjs';



@Component({
  selector: 'app-popular-courses',
  standalone: true,
  imports: [TranslocoModule ,CardCarruselComponent],
  templateUrl: './popular-courses.component.html',
  styleUrl: './popular-courses.component.css'
})
export class PopularCoursesComponent {

  public popularService = inject(CourseUsecaseProvider);
  public popularCourses: ICard[] = [];
  public isLoading = false;

  ngOnInit(): void {
    this.getPopulars();
  }

  public getPopulars(): void {
    this.isLoading = true
    this.popularService.usecase.getCoursesByParams('?filter=POPULAR&perPage=5')
      .pipe(
        map(courses => courses.map(PopularCourseCardAdapter)),
        finalize(() => this.isLoading = false),
      ).subscribe(pc => this.popularCourses = pc)
  }

}
