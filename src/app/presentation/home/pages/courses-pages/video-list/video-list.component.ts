import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { PartialCourseToPlayerCard } from '../../../adapters/PlayerCardAdapter';
import { PlayerCardComponent } from '../../../components/player-card/player-card.component';
import { Category } from '../../../../../core/categories/domain/category.model';
import { CategoyUsecaseProvider } from '../../../../../core/categories/infrastructure/providers/category-usecase-provider';
import { finalize } from 'rxjs';
import { CourseUsecaseProvider } from '../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { PartialCourse } from '../../../../../core/course/domain/course.model';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [RouterLink, TranslocoModule, CommonModule, PlayerCardComponent],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent {

  public fetchedCategories= signal<Category[]>([])
  private categoryUseCaseService = inject(CategoyUsecaseProvider);
  public selectedCategory?: Category;
  public isLoadingCategories = false;

  private param?: string

  public coursesUseCaseService = inject(CourseUsecaseProvider);
  public isLoadingCourses = false;
  public coursesByCategory = signal<PartialCourse[]>([]);

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string ]: string }) => {
      if(params['category']) {
        this.param = params['category']
      }
      this.getCategories();
    });
  }

  adaptToPlayerCard(video: PartialCourse) {
    return PartialCourseToPlayerCard(video);
  }

  public getCategories(params?: string) {
    this.isLoadingCategories = true
    this.categoryUseCaseService.usecase.getByParams(params)
      .pipe(finalize(() => this.isLoadingCategories = false))
      .subscribe(
        c => {
          this.fetchedCategories.set(c)
          if(this.param){
            this.setSelectedCategory(this.fetchedCategories().find(category => category.name == this.param)!)
          }
          else{
            this.setSelectedCategory(c[0])
          }
        }
      )
  }

  public getCoursesByCategory() {
    this.isLoadingCourses = true
    this.coursesUseCaseService.usecase.getCoursesByParams(`?filter=RECENT&category=${this.selectedCategory?.id}`)
      .pipe(
        finalize(() => this.isLoadingCourses = false),
      ).subscribe(c => this.coursesByCategory.set(c))
  }

  
  onCategorySelected(category: Category) {
    this.router.navigate([] ,{queryParams: {category: category.name}, queryParamsHandling: 'merge'});
    this.setSelectedCategory(category);
  }

  private setSelectedCategory(category : Category) {    
    this.selectedCategory = category;    
    this.getCoursesByCategory();
  }
}
