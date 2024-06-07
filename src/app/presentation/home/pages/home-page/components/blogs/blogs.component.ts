import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { finalize, map } from 'rxjs';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { ILatestBlogs } from '../../../../interfaces/latest-blogs-model';
import { BlogUsecaseProvider } from '../../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { BlogAdapter } from '../../../../adapters/BlogAdapter';

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
  public latestBlogs: ILatestBlogs[] = [];

  
  public getBlogs(params?: string) {
    this.isLoadingBlogs = true;
    this.blogUseCaseService.usecase.getByParams(params ?? '')
      .pipe(
        map(b => b.map(BlogAdapter)),
        finalize(() => this.isLoadingBlogs = false)
      )
      .subscribe(c => this.latestBlogs = c)
  }

  ngOnInit(): void {
    this.getBlogs('?filter=RECENT&perPage=5');
  }
}
