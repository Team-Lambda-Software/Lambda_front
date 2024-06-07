import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { IVideoCourses } from '../../../interfaces/video-courses-model';
import { CategoryDataAdapterCourse } from '../../../adapters/CategoryDataAdapter';
import { PartialCourseToPlayerCard, PlayerCardAdapter } from '../../../adapters/PlayerCardAdapter';
import { PlayerCardComponent } from '../../../components/player-card/player-card.component';
import { Category } from '../../../../../core/categories/domain/category.model';
import { CategoyUsecaseProvider } from '../../../../../core/categories/infrastructure/providers/category-usecase-provider';
import { finalize } from 'rxjs';
import { CourseUsecaseProvider } from '../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { Course, PartialCourse } from '../../../../../core/course/domain/course.model';
import { IPlayerCard } from '../../../interfaces/IPlayerCard';

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

  public coursesUseCaseService = inject(CourseUsecaseProvider);
  public isLoadingCourses = false;
  public coursesByCategory = signal<PartialCourse[]>([]);

  public videos: IVideoCourses[]  = [
    {
      id: 1,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 2,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 3,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 4,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 5,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 6,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 7,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 8,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    }
  ];


  ngOnInit(): void {
    this.getCategories()
  }

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string ]: string }) => {
      if(params['category']) {
        this.fetchedCategories()
          .forEach(category => {
            if(category.name == params['category']) {
              this.setSelectedCategory(category);
            }
        });
      }
    });
  }

  adaptToPlayerCard(video: PartialCourse) {
    return PartialCourseToPlayerCard(video);
  }

  public getCategories(params?: string) {
    this.isLoadingCategories = true
    this.categoryUseCaseService.usecase.getByParams(params ?? '')
      .pipe(finalize(() => this.isLoadingCategories = false))
      .subscribe(
        c => {
          this.fetchedCategories.set(c);
          this.onCategorySelected(c[0]);
        }
      )
  }

  public getCoursesByCategory(): void {
    this.isLoadingCourses = true
    this.coursesUseCaseService.usecase.getCoursesByParams(`?filter=${this.selectedCategory?.name.toUpperCase()}`)
      .pipe(
        finalize(() => this.isLoadingCourses = false),
      ).subscribe(c => this.coursesByCategory.set(c))
  }

  
  onCategorySelected(category: Category) {
    this.router.navigate([] ,{queryParams: {category: category.name}, queryParamsHandling: 'merge'});
    this.setSelectedCategory(category);
  }

  setSelectedCategory(category : Category) {
    this.selectedCategory = category;
    this.getCoursesByCategory();
  }
}
