import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, signal } from '@angular/core';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { CommentFeatureDto, ETarget, IComment } from '../../../../../../../core/comments/domain/comment.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { delay } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { UserStatusService } from '../../../../../../../core/user/infraestructure/services/user-status.service';

const SNACKBAR_OPTIONS: MatSnackBarConfig = { duration: 4000, verticalPosition: 'top', horizontalPosition: 'center'};

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, TranslocoModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent implements OnInit {

  @ViewChild('commentInput') commentInput!: ElementRef;
  @Output() commentCreated = new EventEmitter<IComment>();
  @Input({ required: true }) blogId!: string;
  private snackBar = inject(MatSnackBar);
  private commentUseCase = inject(CommentsUseCaseProvider);
  private userStatusService = inject(UserStatusService);
  public newComment = new FormControl('');
  public isLoadingComment = signal<boolean>(false);

  ngOnInit(): void {
    this.newComment.valueChanges.subscribe(() => this.resizeInput());
  }
  
  sendComment() {
    if(!this.newComment.value) return this.snackBar.open('Comment can not be empty', 'Ok', SNACKBAR_OPTIONS);
    const newComment = this.newComment.value;
    this.resizeInput();
    this.newComment.setValue('Sending message...');
    this.newComment.disable();
    this.isLoadingComment.set(true);
    let comment = new CommentFeatureDto(this.blogId, ETarget.blog, newComment)
    this.commentUseCase.usecase.createComment(comment)
      .pipe(delay(2000))
      .subscribe({
        next: () => {
          this.isLoadingComment.set(false);
          this.newComment.enable();
          this.snackBar.open('Comment created', 'Close', SNACKBAR_OPTIONS);
          this.newComment.setValue('');
          if(this.userStatusService.currentUser().hasValue()) {
            const username = this.userStatusService.currentUser().getValue().name;
            this.commentCreated.emit({id: crypto.randomUUID(), content: newComment, userName: username, date: new Date()});
          }
        },
        error: () => {
          this.isLoadingComment.set(false);
          this.newComment.enable();
          this.newComment.setValue(newComment);
          this.snackBar.open('A error happened creating the comment', 'Ok', SNACKBAR_OPTIONS);
        }
      
      });
    return;
  }

  private resizeInput() {
    this.commentInput.nativeElement.style.height = '';
    this.commentInput.nativeElement.style.height = this.commentInput.nativeElement.scrollHeight + 'px'
  }
}
