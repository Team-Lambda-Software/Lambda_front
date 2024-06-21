import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { IComment } from '../../../../../../../core/comments/domain/comment.model';
import { TranslocoModule } from '@jsverse/transloco';
import { finalize } from 'rxjs';
import { SquareSkeletonComponent } from '../../../../../../shared/components/square-skeleton/square-skeleton.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    TranslocoModule,
    SquareSkeletonComponent,
    InfiniteScrollModule
  ],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input({required: true}) 
  public blogId!: string;
  
  private currentPage = 1;
  private commentUseCase = inject(CommentsUseCaseProvider);
  public comments = signal<IComment[]>([]);
  public isLoadingComments = signal<boolean>(false);
  public isLoadingMoreComments = signal<boolean>(false);
  public document = inject(DOCUMENT)
  public scrollContainer: HTMLElement | null = null;
  public hasNoMoreComments = signal<boolean>(false);

  ngOnInit() {
    this.scrollContainer = this.document.getElementById('scrollBlogCommentContainer');
    this.getComments()
  }

  getComments() {
    if(this.currentPage === 1) this.isLoadingComments.set(true);
    else this.isLoadingMoreComments.set(true);
    this.commentUseCase.usecase
      .getCommentsByParams(`?perPage=5&page=${this.currentPage}&blog=${this.blogId}`)
      .pipe(
        finalize(() => {
          this.isLoadingComments.set(false);
          this.isLoadingMoreComments.set(false);
          this.currentPage++;
        })
      )
      .subscribe( (comment) => {
        if(comment.length === 0) this.hasNoMoreComments.set(true);
        this.comments.set([...this.comments(), ...comment]);
      });
  }

  onClick() {
    console.log(this.document.getElementById('scrollBlogCommentContainer'));
  }

}

