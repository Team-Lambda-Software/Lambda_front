import { Component, OnInit, inject } from '@angular/core';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { ICourse } from '../../../interfaces/course-model';
import { ILittleCard } from '../../../interfaces/ILittleCard';
import { LitleCardComponent } from '../../../components/litle-card/litle-card.component';
import { CourseLitleCardAdapter, CourseToILittleCard } from '../../../adapters/LitleCardAdapter';
import { CourseUseCaseService } from '../../../../../core/course/application/course-use-case.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FullCourse } from '../../../../../core/course/domain/course.model';
import { Observable, map, of } from 'rxjs';
import { CarruselBgImgComponent } from '../../../components/carrusel-bg-img/carrusel-bg-img.component';
import { TranslocoModule } from '@jsverse/transloco';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-course',
  standalone: true,
  imports: [
    BasicHeaderComponent,
    LitleCardComponent,
    CarruselBgImgComponent,
    TranslocoModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './main-course.component.html',
  styleUrl: './main-course.component.css'
})
export class MainCourseComponent implements OnInit {

  private id?: string;
  public courseUseCaseService = inject(CourseUseCaseService);
  public logoPath = 'assets/icons/app-logo.svg'
  public fullCourse?: FullCourse;
  public popularCourses$ = of<ILittleCard[]>([]);

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if(params['id']) {
        this.id = params['id'];
      } else this.router.navigate(['/home'])
    });
  }

  ngOnInit(): void {
    this.getById();
    this.popularCourses$ = this.getPopulars();
  }

  adaptCourseToLittleCard(course: ICourse): ILittleCard {
    return CourseLitleCardAdapter(course);
  }

  getById() {
    this.courseUseCaseService.getById(this.id!)
      .subscribe( course => this.fullCourse = course)
  }

  public getPopulars(): Observable<ILittleCard[]> {
    return this.courseUseCaseService.getPopularCourses()
      .pipe(map(courses => courses.map(CourseToILittleCard)))
  }

}
