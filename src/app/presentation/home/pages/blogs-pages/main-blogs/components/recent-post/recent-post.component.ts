import { Component, OnInit, inject, signal } from '@angular/core';
import { LitleCardComponent } from '../../../../../components/litle-card/litle-card.component';
import { RouterLink } from '@angular/router';
import { BlogUsecaseProvider } from '../../../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { ILittleCard } from '../../../../../interfaces/ILittleCard';
import { finalize, map } from 'rxjs';
import { PartialBlogToILittleCardAdapter } from '../../../../../adapters/BlogAdapter';
import { SquareSkeletonComponent } from '../../../../../../shared/components/square-skeleton/square-skeleton.component';

@Component({
  selector: 'app-recent-post',
  standalone: true,
  imports: [LitleCardComponent, RouterLink, SquareSkeletonComponent],
  templateUrl: './recent-post.component.html',
  styleUrl: './recent-post.component.css'
})
export class RecentPostComponent implements OnInit {
  
  private blogUseCaseService = inject(BlogUsecaseProvider);
  public blogs = signal<ILittleCard[]>([]);
  public isLoading = signal(false);
  
  ngOnInit(): void {
    this.getRecentPost();
  }
  
  public getRecentPost() {
    this.isLoading.set(true);
    this.blogUseCaseService.usecase.getByParams('?filter=RECENT&perPage=10')
      .pipe(
        map(blogs => blogs.map(PartialBlogToILittleCardAdapter)),
        finalize(() => this.isLoading.set(false))
      ).subscribe(this.blogs.set);
  }

}
