import { Component, Input, OnInit, Signal, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@jsverse/transloco';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { IComment } from '../../../../../../../core/comments/domain/comment.model';
import { SquareSkeletonComponent } from '../../../../../../shared/components/square-skeleton/square-skeleton.component';
import { finalize } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    SquareSkeletonComponent,
    InfiniteScrollModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  @Input({ required: true }) sectionId!: string;
  private currentPage = 1;
  public commentService = inject(CommentsUseCaseProvider)
  public comments = signal<IComment[]>([]);
  public isLoading = signal(false);
  public isLoadingMoreComments = signal(false);
  public newComment = '';
  public document = inject(DOCUMENT);
  public scrollContainer: HTMLElement | null = null;
  public hasNoMoreComments = signal<boolean>(false);

  ngOnInit() {
    this.scrollContainer = this.document.getElementById('scrollCourseCommentContainer');
    this.getComments()
  }

  public getComments(): void{
    if(this.currentPage === 1) this.isLoading.set(true);
    else this.isLoadingMoreComments.set(true);
    this.commentService.usecase
      .getCommentsByParams(`?perPage=5&page=${this.currentPage}&lesson=${this.sectionId}`)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        this.isLoadingMoreComments.set(false);
        this.currentPage++;
      }))
      .subscribe({
        next: (comments) => {
          if(comments.length === 0) this.hasNoMoreComments.set(true);
          this.comments.set([...this.comments(), ...comments])
          
        },
        error: (err) => console.log(err)
      })
  }

  public ngOnChanges(): void {
    this.hasNoMoreComments.set(false);
    this.comments.set([]);
    this.currentPage = 1;
    this.getComments();
  }

}
