import { Component, OnInit, inject, signal } from '@angular/core';
import { CourseUsecaseProvider } from '../../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { finalize } from 'rxjs';
import { PlayerCardComponent } from '../../../../components/player-card/player-card.component';
import { IPlayerCard } from '../../../../interfaces/IPlayerCard';
import { PartialCourseToPlayerCard } from '../../../../adapters/PlayerCardAdapter';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-video-courses',
  standalone: true,
  imports: [
    PlayerCardComponent,
    TranslocoModule,
    RouterLink,
    SquareSkeletonComponent,
    InfiniteScrollModule
  ],
  templateUrl: './video-courses.component.html',
  styleUrl: './video-courses.component.css'
})
export class VideoCoursesComponent implements OnInit {

  public currentPage = 1;
  public courseUseCase = inject(CourseUsecaseProvider);
  public courses = signal<IPlayerCard[]>([]);
  public isLoading = signal(false);
  public isLoadingMoreCourses = signal(false);

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    if(this.currentPage === 1) this.isLoading.set(true);
    else this.isLoadingMoreCourses.set(true);
    this.courseUseCase.usecase
      .getCoursesByParams(`?perPage=3&page=${this.currentPage}&filter=RECENT`)
      .pipe(finalize(() => {
        this.isLoading.set(false)
        this.isLoadingMoreCourses.set(false)
        this.currentPage++;
      }))
      .subscribe((courses) => {
        this.courses.set([
          ...this.courses(),
          ...courses.map(c => PartialCourseToPlayerCard(c))
        ]);
      })
  }
}
