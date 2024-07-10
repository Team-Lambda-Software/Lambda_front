import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CourseUsecaseProvider } from '../../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { finalize } from 'rxjs';
import { PartialCourseToILittleCard } from '../../../../adapters/LitleCardAdapter';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { CarruselBgImgComponent } from '../../../../components/carrusel-bg-img/carrusel-bg-img.component';

@Component({
  selector: 'app-trainer-courses',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoModule,
    SquareSkeletonComponent,
    CarruselBgImgComponent
  ],
  templateUrl: './trainer-courses.component.html',
  styleUrl: './trainer-courses.component.css'
})
export class TrainerCoursesComponent implements OnInit {
  
  @Input({required: true}) public trainerId!: string
  private courseService = inject(CourseUsecaseProvider);
  public currentPage = 1;
  public courses = signal<ILittleCard[]>([]);
  public isLoading = signal(false);
  public isLoadingMoreCourses = signal(false);

  ngOnInit(): void {
   this.getCourses();
  }

  getCourses() {
    if(this.currentPage === 1) this.isLoading.set(true);
    else this.isLoadingMoreCourses.set(true);
    this.courseService.usecase
      .getCoursesByParams(`?perPage=3&page=${this.currentPage}&filter=RECENT&trainer=${this.trainerId}`)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        this.isLoadingMoreCourses.set(false);
        this.currentPage++;
      }))
      .subscribe((courses) => {
        this.courses.set([
          ...this.courses(),
          ...courses.map(c => PartialCourseToILittleCard(c))
        ]);
      })
  }
}
