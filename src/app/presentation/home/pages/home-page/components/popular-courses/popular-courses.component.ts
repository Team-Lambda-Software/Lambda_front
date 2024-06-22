import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { TranslocoModule } from '@jsverse/transloco';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { CourseUsecaseProvider } from '../../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { finalize, map } from 'rxjs';
import { PartialCourseToILittleCard } from '../../../../adapters/LitleCardAdapter';
import { CarruselBgImgComponent } from '../../../../components/carrusel-bg-img/carrusel-bg-img.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-popular-courses',
  standalone: true,
  imports: [
    RouterLink,
    SquareSkeletonComponent,
    TranslocoModule,
    CarruselBgImgComponent,
    InfiniteScrollModule
  ],
  templateUrl: './popular-courses.component.html',
  styleUrl: './popular-courses.component.css'
})
export class PopularCoursesComponent implements OnInit {
  
  private courseUseCaseService = inject(CourseUsecaseProvider);
  private currentPage = 1;
  public popularCourses: ILittleCard[] = [];
  public isLoadingPopularCourses = false;
  public isLoadingMorePopularCourses = false;

  ngOnInit(): void {
    this.getPopulars();
  }

  public getPopulars(): void {
    if(this.currentPage === 1) this.isLoadingPopularCourses = true;
    else this.isLoadingMorePopularCourses = true;
    this.courseUseCaseService.usecase
      .getCoursesByParams(`?perPage=3&page=${this.currentPage}&filter=POPULAR`)
      .pipe(
        map(courses => courses.map(PartialCourseToILittleCard)),
        finalize(() => {
          this.isLoadingPopularCourses = false
          this.isLoadingMorePopularCourses = false
          this.currentPage++;
        }),
      ).subscribe(pc => this.popularCourses = [...this.popularCourses, ...pc])
  }
}
