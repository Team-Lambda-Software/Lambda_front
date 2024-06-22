import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { finalize, map } from 'rxjs';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { BlogUsecaseProvider } from '../../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { PartialBlogToILittleCardAdapter } from '../../../../adapters/BlogAdapter';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    TranslocoModule,
    RouterLink,
    SquareSkeletonComponent,
    InfiniteScrollModule
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  
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
      .getByParams(`?filter=RECENT&perPage=4&page=${this.currentPage}`)
      .pipe(
        map(b => b.map(PartialBlogToILittleCardAdapter)),
        finalize(() => {
          this.isLoadingBlogs.set(false);
          this.isLoadingMoreBlogs.set(false);
          this.currentPage++;
        })
      )
      .subscribe(c => this.latestBlogs.set([...this.latestBlogs(), ...c]))
  }
}