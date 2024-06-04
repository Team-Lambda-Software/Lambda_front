import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { ProgramsTagComponent } from '../../components/programs-tag/programs-tag.component';
import { CardCarruselComponent } from '../../components/card-carrusel/card-carrusel.component';
import { ICard, IProgram } from '../../interfaces/ILittleCard';
import { CoursesPopularService } from '../../services/courses/getPopulars/courses-popular.service';
import { CourseLevelService } from '../../services/courses/getByLevel/course-level.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CourseCardAdapter, PopularCourseCardAdapter } from '../../adapters/CardAdapter';
import { CourseTagAdapter } from '../../adapters/TagAdapter';
import { SearchService } from '../../services/search/search.service';
import { SearchUsecaseProvider } from '../../../../core/search/infraestructure/providers/search-api-usecase-provider';
import { SearchModel } from '../../../../core/search/domain/search-model';
import { CourseUsecaseProvider } from '../../../../core/course/infrastructure/providers/course-usecase-provider';
import { finalize, map } from 'rxjs';

interface ITag {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterLink, BasicHeaderComponent, ProgramsTagComponent, CardCarruselComponent, TranslocoModule, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public inputSearch: string = '';
  public program: SearchModel = {blogs: [], courses: []};
  public popularService = inject(CourseUsecaseProvider);
  public searchService = inject(SearchUsecaseProvider);
  public popularCourses: ICard[] = [];
  public isLoading = false;  

  public categories: ITag[] = [
    { id: 1, name: 'Prenatal' },
    { id: 2, name: 'For Women' },
    { id: 3, name: 'Trainning'},
    { id: 4, name: 'Courses'},
    { id: 5, name: 'Videos'},
    { id: 6, name: 'Morning'},
    { id: 7, name: 'Yoga'},
    { id: 8, name: 'Restorative'},
    { id: 9, name: 'Recent Posts'},
    { id: 10, name: 'Most Popular'}
  ];

  constructor() { }

  ngOnInit(): void {
    this.getPopulars();
  }

  public getPopulars(): void {
    this.isLoading = true
    this.popularService.usecase.getCoursesByParams('?filter=POPULAR')
      .pipe(
        map(courses => courses.map(PopularCourseCardAdapter)),
        finalize(() => this.isLoading = false),
      ).subscribe(pc => this.popularCourses = pc)
  }


  getBySearch() {
    this.isLoading = true;
    let response =this.searchService.usecase.getBySearch(this.inputSearch)
      if(response.isError()){
        
      }
      response.getValue()
      .subscribe((data) => console.log(data)
    )
    this.isLoading = false;
  }
}
