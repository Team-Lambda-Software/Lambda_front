import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { IComment } from '../../../../../../../core/comments/domain/comment.model';
import { TranslocoModule } from '@jsverse/transloco';
import { finalize } from 'rxjs';
import { SquareSkeletonComponent } from '../../../../../../shared/components/square-skeleton/square-skeleton.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [TranslocoModule, SquareSkeletonComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input({required: true}) blogId!: string;
  private commentUseCase = inject(CommentsUseCaseProvider);
  public comments = signal<IComment[]>([]);
  public isLoadingComments = signal<boolean>(false);

  ngOnInit() {
    this.getComments()
  }

  getComments() {
    this.isLoadingComments.set(true);
    this.commentUseCase.usecase
      .getCommentsByParams(`?perPage=10&page=1&blog=${this.blogId}`)
      .pipe(finalize(() => this.isLoadingComments.set(false)))
      .subscribe(this.comments.set);
  }
}
