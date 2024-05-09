import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ProgramsTagComponent } from '../../../components/programs-tag/programs-tag.component';
import { CarruselBgImgComponent } from '../../../components/carrusel-bg-img/carrusel-bg-img.component';
import { CoursesPopularService } from '../../../services/courses/getPopulars/courses-popular.service';
import { ILittleCard, IProgram } from '../../../interfaces/ILittleCard';
import { CourseLevelService } from '../../../services/courses/getByLevel/course-level.service';
import { CourseLitleCardAdapter } from '../../../adapters/LitleCardAdapter';
import { CourseTagAdapter } from '../../../adapters/TagAdapter';

type CoursesLevel = 'beginner' | 'skilled' | 'master';

const coursesLevel = {
  'beginner': 1, // 'Beginner
  'skilled': 2,
  'master': 3
}

@Component({
  selector: 'app-training-page',
  standalone: true,
  imports: [RouterLink, CommonModule, ProgramsTagComponent, CarruselBgImgComponent ,TranslocoModule],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.css'
})
export class TrainingPageComponent {

  public popularService = inject(CoursesPopularService);
  public programSevice = inject(CourseLevelService);

  
  public levels: CoursesLevel[] = Object.keys(coursesLevel) as CoursesLevel[];
  public selectedLevel: CoursesLevel = 'beginner';

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if(params['level']) {
        this.setSelectedLevel(params['level']);
      }
    });
  }

  onLevelSelected(level: CoursesLevel) {
    // console.log('Level selected: ', level);
    this.router.navigate([] ,{queryParams: {level: level}, queryParamsHandling: 'merge'});
    this.setSelectedLevel(level);
  }

  setSelectedLevel(level: CoursesLevel) {
    this.selectedLevel = level;
  }

  public getPopulars(): ILittleCard[] {
    let popular= this.popularService.getPopulars();
    return popular.map((course) => CourseLitleCardAdapter(course));
  }

  getLevel(): number {
    return coursesLevel[this.selectedLevel];
  }

  getProgramsByLevel(): IProgram[] {
    let courses = this.programSevice.getByLevel(this.getLevel());
    return courses.map((course) => CourseTagAdapter(course));
  }
}
