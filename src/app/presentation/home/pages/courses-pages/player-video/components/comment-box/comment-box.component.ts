import { Component, EventEmitter, Input, Output, Signal, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { delay } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { CommentFeatureDto, ETarget } from '../../../../../../../core/comments/domain/comment.model';

const SNACKBAR_OPTIONS: MatSnackBarConfig = { duration: 4000, verticalPosition: 'top', horizontalPosition: 'center'};

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, TranslocoModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent {
  @Output() commentCreated = new EventEmitter<void>();
  @Input({ required: true }) sectionId!: Signal<string>;
  private snackBar = inject(MatSnackBar);
  private commentUseCase = inject(CommentsUseCaseProvider);
  public newComment = '';
  public isLoadingComment = signal<boolean>(false);
  
  sendComment() {
    if( this.newComment === '') return this.snackBar.open('Comment can not be empty', 'Ok', SNACKBAR_OPTIONS);
    const newComment = this.newComment;
    this.newComment = 'Sending message...';
    this.isLoadingComment.set(true);
    let comment = new CommentFeatureDto(this.sectionId(), ETarget.section, newComment)
    this.commentUseCase.usecase.createComment(comment)
      .pipe(delay(1000))
      .subscribe({
        next: () => {
          this.isLoadingComment.set(false);
          this.snackBar.open('Comment created', 'Close', SNACKBAR_OPTIONS);
          this.newComment = '';
          this.commentCreated.emit();
        },
        error: () => {
          this.newComment = newComment;
          this.snackBar.open('A error happened creating the comment', 'Ok', SNACKBAR_OPTIONS)
        }
      
      });
    return;
  }
}
