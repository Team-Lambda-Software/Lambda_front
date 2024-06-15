import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { finalize, map } from 'rxjs';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { BlogUsecaseProvider } from '../../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { PartialBlogToILittleCardAdapter } from '../../../../adapters/BlogAdapter';
import { ILittleCard } from '../../../../interfaces/ILittleCard';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    TranslocoModule,
    RouterLink,
    SquareSkeletonComponent,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  
  private blogUseCaseService = inject(BlogUsecaseProvider);
  public isLoadingBlogs = false;
  public latestBlogs: ILittleCard[] = [];

  ngOnInit(): void {
    this.getBlogs('?filter=RECENT&perPage=5');
  }

  public getBlogs(params?: string) {
    this.isLoadingBlogs = true;
    this.blogUseCaseService.usecase.getByParams(params)
      .pipe(
        map(b => b.map(PartialBlogToILittleCardAdapter)),
        finalize(() => this.isLoadingBlogs = false)
      )
      .subscribe(c => this.latestBlogs = c)
  }
}