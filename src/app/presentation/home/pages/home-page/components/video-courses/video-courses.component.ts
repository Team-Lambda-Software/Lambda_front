import { Component, OnInit, inject, signal } from '@angular/core';
import { CourseUsecaseProvider } from '../../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { finalize } from 'rxjs';
import { PlayerCardComponent } from '../../../../components/player-card/player-card.component';
import { IPlayerCard } from '../../../../interfaces/IPlayerCard';
import { PartialCourseToPlayerCard } from '../../../../adapters/PlayerCardAdapter';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';

@Component({
  selector: 'app-video-courses',
  standalone: true,
  imports: [
    PlayerCardComponent,
    TranslocoModule,
    RouterLink,
    SquareSkeletonComponent
  ],
  templateUrl: './video-courses.component.html',
  styleUrl: './video-courses.component.css'
})
export class VideoCoursesComponent implements OnInit {

  public courseUseCase = inject(CourseUsecaseProvider);
  public courses = signal<IPlayerCard[]>([]);
  public isLoading = false;

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.isLoading = true;
    this.courseUseCase.usecase.getCoursesByParams('?filter=RECENT&perPage=10&page=1')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((courses) => {
        this.courses.set( courses.map(c => PartialCourseToPlayerCard(c)));
      })
  }
}
