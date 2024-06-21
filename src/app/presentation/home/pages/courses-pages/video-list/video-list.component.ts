import { Component, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { PartialCourseToPlayerCard } from '../../../adapters/PlayerCardAdapter';
import { PlayerCardComponent } from '../../../components/player-card/player-card.component';
import { Category } from '../../../../../core/categories/domain/category.model';
import { CategoyUseCaseProvider } from '../../../../../core/categories/infrastructure/providers/category-usecase-provider';
import { finalize } from 'rxjs';
import { CourseUsecaseProvider } from '../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { PartialCourse } from '../../../../../core/course/domain/course.model';
import { SquareSkeletonComponent } from '../../../../shared/components/square-skeleton/square-skeleton.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoModule,
    CommonModule,
    PlayerCardComponent,
    SquareSkeletonComponent,
    InfiniteScrollModule
  ],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent {

  private currentPage = 1;
  private categoryUseCaseService = inject(CategoyUseCaseProvider);
  private param?: string
  public fetchedCategories= signal<Category[]>([])
  public selectedCategory?: Category;
  public isLoadingCategories = false;
  public coursesUseCaseService = inject(CourseUsecaseProvider);
  public isLoadingCourses = false;
  public coursesByCategory = signal<PartialCourse[]>([]);
  public isLoadingMoreCoursesByCategory = false;
  public scrollContainer = inject(DOCUMENT).getElementById('scrollContainer');

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string ]: string }) => {
      console.log('params');
      console.log(params);
      if(params['category']) {
        this.param = params['category'];
      }
    });
  }

  ngOnInit() { 
    this.getCategories();
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
    if (this.currentPage === 1) this.isLoadingCourses = true;
    else this.isLoadingMoreCoursesByCategory = true;
    this.coursesUseCaseService.usecase
      .getCoursesByParams(`?filter=RECENT&category=${this.selectedCategory?.id}&page=${this.currentPage}&perPage=10`)
      .pipe(
        finalize(() => {
          this.isLoadingCourses = false;
          this.isLoadingMoreCoursesByCategory = false;
          this.currentPage++;
        }),
      ).subscribe(c => this.coursesByCategory.set([...this.coursesByCategory(), ...c]))
  }

  
  onCategorySelected(category: Category) {
    this.router.navigate([] ,{queryParams: {category: category.name}, queryParamsHandling: 'merge'});
    this.setSelectedCategory(category);
  }

  private setSelectedCategory(category : Category) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.coursesByCategory.set([]);
    this.getCoursesByCategory();
  }
}
