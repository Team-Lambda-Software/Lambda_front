import { Component, inject, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BlogArticleComponent } from '../../../home-page/components/blog-article/blog-article.component';
import { BlogUsecaseProvider } from '../../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { DOCUMENT } from '@angular/common';
import { finalize, map } from 'rxjs';
import { PartialBlogToILittleCardAdapter } from '../../../../adapters/BlogAdapter';

@Component({
  selector: 'app-trainer-blogs',
  standalone: true,
  imports: [
    TranslocoModule,
    RouterLink,
    SquareSkeletonComponent,
    InfiniteScrollModule,
    BlogArticleComponent
  ],
  templateUrl: './trainer-blogs.component.html',
  styleUrl: './trainer-blogs.component.css'
})
export class TrainerBlogsComponent {
  
  @Input({required: true}) trainerId!: string;
  private currentPage = 1;
  private blogUseCaseService = inject(BlogUsecaseProvider);
  public isLoadingBlogs = signal(false);
  public latestBlogs = signal<ILittleCard[]>([]);
  public isLoadingMoreBlogs = signal(false);
  public scrollContainer = inject(DOCUMENT).getElementById('scrollContainer');

  ngOnInit(): void {
    this.getBlogs();
  }

  public getBlogs() {
    if(this.currentPage === 1) this.isLoadingBlogs.set(true);
    else this.isLoadingMoreBlogs.set(true);
    this.blogUseCaseService.usecase
      .getByParams(`?filter=RECENT&perPage=4&page=${this.currentPage}&trainer=${this.trainerId}`)
      .pipe(
        map(b => b.map(PartialBlogToILittleCardAdapter)),
        finalize(() => {
          this.isLoadingBlogs.set(false);
          this.isLoadingMoreBlogs.set(false);
          this.currentPage++;
        })
      ).subscribe(c => 
        this.latestBlogs.set([
          ...this.latestBlogs(),
          ...c]
        )
      )
  }
}
