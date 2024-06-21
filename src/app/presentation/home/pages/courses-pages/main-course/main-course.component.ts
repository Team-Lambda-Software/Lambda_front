import { Component, OnInit, inject } from '@angular/core';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { ICourse } from '../../../interfaces/course-model';
import { ILittleCard } from '../../../interfaces/ILittleCard';
import { LitleCardComponent } from '../../../components/litle-card/litle-card.component';
import { CourseLitleCardAdapter, PartialCourseToILittleCard } from '../../../adapters/LitleCardAdapter';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, finalize, map, of } from 'rxjs';
import { CarruselBgImgComponent } from '../../../components/carrusel-bg-img/carrusel-bg-img.component';
import { TranslocoModule } from '@jsverse/transloco';
import { AsyncPipe } from '@angular/common';
import { CourseUsecaseProvider } from '../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { Course, Lesson } from '../../../../../core/course/domain/course.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlayerVideoComponent } from '../player-video/player-video.component';
import { NavigationExtras } from '@angular/router';
import { SquareSkeletonComponent } from '../../../../shared/components/square-skeleton/square-skeleton.component';

@Component({
  selector: 'app-main-course',
  standalone: true,
  imports: [
    BasicHeaderComponent,
    LitleCardComponent,
    CarruselBgImgComponent,
    TranslocoModule,
    RouterLink,
    AsyncPipe,
    MatExpansionModule,
    PlayerVideoComponent,
    SquareSkeletonComponent
  ],
  templateUrl: './main-course.component.html',
  styleUrl: './main-course.component.css'
})
export class MainCourseComponent implements OnInit {

  private currentPopularPage = 1;
  public isLoadingMorePopulars = false;
  public isLoadingPopulars = false;
  public id?: string;
  public courseUseCaseService = inject(CourseUsecaseProvider);
  public logoPath = 'assets/icons/app-logo.svg'
  public course?: Course;
  public popularCourses: ILittleCard[] = []
  public isLoading = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.currentPopularPage = 1;
        this.id = params['id'];
        this.getById();
        this.getPopulars();
      } else this.router.navigate(['/home'])
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.isLoading = false;
    }, 200);
  }

  goToPlayer(lesson: Lesson) {
    const data: NavigationExtras = { state: { lesson, courseId: this.id } }
    this.router.navigate(['/home/player-video'], data);
  }


  getById() {
    this.isLoading = true
    this.courseUseCaseService.usecase.getById(this.id!)
      .subscribe(course => this.course = course).add(() => this.isLoading = false)
  }

  public getPopulars() {
    if (this.currentPopularPage === 1) this.isLoadingPopulars = true;
    else this.isLoadingMorePopulars = true;
    this.courseUseCaseService.usecase
      .getCoursesByParams(`?filter=POPULAR&perPage=3&page=${this.currentPopularPage}`)
      .pipe(
        map(courses => courses.map(PartialCourseToILittleCard)),
        finalize(() => {
          this.isLoadingMorePopulars = false;
          this.isLoadingPopulars = false;
          this.currentPopularPage++;
        })
      ).subscribe(courses => this.popularCourses = [...this.popularCourses, ...courses])
  }

}