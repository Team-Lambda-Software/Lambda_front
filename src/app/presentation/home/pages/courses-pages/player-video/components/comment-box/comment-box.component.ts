import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Signal, ViewChild, inject, signal } from '@angular/core';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { CommentFeatureDto, ETarget, IComment } from '../../../../../../../core/comments/domain/comment.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { delay } from 'rxjs';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
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
  @Input({ required: true }) sectionId!: Signal<string>;
  private snackBar = inject(MatSnackBar);
  private commentUseCase = inject(CommentsUseCaseProvider);
  private userStatusService = inject(UserStatusService);
  public newComment = new FormControl('');
  public isLoadingComment = signal<boolean>(false);
  public translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.newComment.valueChanges.subscribe(() => this.resizeInput());
  }
  
  sendComment() {
    const isLanguageEnglish = this.translocoService.getActiveLang() === 'en';
    if(!this.newComment.value) return this.snackBar.open( isLanguageEnglish ? 'Comment can not be empty' : 'Comentario no puede estar vacío', 'Ok', SNACKBAR_OPTIONS);
    const newComment = this.newComment.value;
    this.resizeInput();
    this.newComment.setValue( isLanguageEnglish ? 'Sending message...' : 'Enviando mensaje...');
    this.newComment.disable();
    this.isLoadingComment.set(true);
    let comment = new CommentFeatureDto(this.sectionId(), ETarget.section, newComment)
    this.commentUseCase.usecase.createComment(comment)
      .subscribe({
        next: () => {
          const message = isLanguageEnglish ? 'Comment created' : 'Comentario creado';
          const button = isLanguageEnglish ? 'Close' : 'Cerrar';
          this.isLoadingComment.set(false);
          this.newComment.enable();
          this.snackBar.open(message, button, SNACKBAR_OPTIONS);
          this.newComment.setValue('');
          if(this.userStatusService.currentUser().hasValue()) {
            const username = this.userStatusService.currentUser().getValue().name;
            this.commentCreated.emit({id: crypto.randomUUID(), content: newComment, userName: username, date: new Date()});
          }
        },
        error: () => {
          const message = isLanguageEnglish ? 'A error happened creating the comment' : 'Ocurrió un error creando el comentario';
          this.isLoadingComment.set(false);
          this.newComment.enable();
          this.newComment.setValue(newComment);
          this.snackBar.open(message, 'Ok', SNACKBAR_OPTIONS);
        }
      
      });
    return;
  }

  private resizeInput() {
    this.commentInput.nativeElement.style.height = '';
    this.commentInput.nativeElement.style.height = this.commentInput.nativeElement.scrollHeight + 'px'
  }
}
