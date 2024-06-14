import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CardCarruselComponent } from '../../../components/card-carrusel/card-carrusel.component';
import { LitleCardComponent } from '../../../components/litle-card/litle-card.component';
import { Category } from '../../../../../core/categories/domain/category.model';
import { CategoyUseCaseProvider } from '../../../../../core/categories/infrastructure/providers/category-usecase-provider';
import { finalize, map } from 'rxjs';
import { BlogUsecaseProvider } from '../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { PartialBlogToICardAdapter } from '../../../adapters/BlogAdapter';
import { ICard } from '../../../interfaces/ILittleCard';
import { SquareSkeletonComponent } from '../../../../shared/components/square-skeleton/square-skeleton.component';
import { RecentPostComponent } from './components/recent-post/recent-post.component';

@Component({
  selector: 'app-main-blogs',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoModule,
    CommonModule,
    CardCarruselComponent,
    LitleCardComponent,
    SquareSkeletonComponent,
    RecentPostComponent
  ],
  templateUrl: './main-blogs.component.html',
  styleUrl: './main-blogs.component.css'
})
export class MainBlogsComponent implements OnInit {
  
  private blogUseCaseService = inject(BlogUsecaseProvider);
  private categoryUseCaseService = inject(CategoyUseCaseProvider);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public categories= signal<Category[]>([]);
  public blogsByCategory = signal<ICard[]>([]);
  public isLoadingBlogsByCategory = signal(false);
  public isLoadingCategories = signal(false);
  public selectedCategory?: Category;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if(params['category']) {
        this.selectedCategory = this.categories().find(c => c.name === params['category']);
        const baseQuery = '?filter=RECENT';
        const categoryQuery = this.selectedCategory?.id ? `&category=${this.selectedCategory.id}` : '';
        const queryParams = `${baseQuery}${categoryQuery}`;
        this.getBlogs(queryParams);
      }
    });
  }

  public ngOnInit(): void {
    this.getCategories();
    this.document.documentElement.scrollTop = 0;
    this.document.body.scrollTop = 0;
  }

  onCategorySelected(category : Category) {
    this.router.navigate([] ,{queryParams: {category: category.name}, queryParamsHandling: 'merge'});
    this.setSelectedCategory(category);
  }

  setSelectedCategory(category : Category) {
    this.selectedCategory = category;
  }

  public getCategories(params?: string) {
    this.isLoadingCategories.set(true);
    this.categoryUseCaseService.usecase.getByParams(params ?? '')
      .pipe(finalize(() => this.isLoadingCategories.set(false)))
      .subscribe(c => {
        this.getBlogs('?filter=RECENT&category=' + c[0].id);
        this.setSelectedCategory(c[0]);
        this.categories.set(c);
      })
  }

  public getBlogs(params?: string) {
    this.isLoadingBlogsByCategory.set(true);
    this.blogUseCaseService.usecase.getByParams(params ?? '')
      .pipe(
        map(b => b.map(PartialBlogToICardAdapter)),
        finalize(() => this.isLoadingBlogsByCategory.set(false))
      ).subscribe(b => this.blogsByCategory.set(b))
  }
}