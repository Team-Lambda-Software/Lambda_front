import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { CommentFeatureDto, ETarget, IComment } from '../../../../../../../core/comments/domain/comment.model';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentResponseToComment } from '../../../../../../../core/comments/infraestructure/adapters/converters/CommentResponseToComment';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent {
  @Input({ required: true }) blogId!: string;
  private snackBar = inject(MatSnackBar);
  private commentUseCase = inject(CommentsUseCaseProvider);
  public newComment = '';
  
  sendComment() {
    if( this.newComment === '') return this.snackBar.open('Comment can not be empty', 'Close', { duration: 4000 });
    let comment = new CommentFeatureDto(this.blogId, ETarget.blog, this.newComment)
    this.commentUseCase.usecase.createComment(comment)
      .subscribe({
        next: () => {
          this.snackBar.open('Comment created', 'Close', { duration: 4000 });
          this.newComment = '';
        },
        error: () => this.snackBar.open('A error happened creating the comment', 'Close', { duration: 4000 }),
      
      });
    return;
  }
}
