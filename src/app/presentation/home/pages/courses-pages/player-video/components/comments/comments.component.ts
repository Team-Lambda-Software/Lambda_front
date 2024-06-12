import { Component, Input, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { IComment } from '../../../../../../../core/comments/domain/Comment';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  @Input({ required: true }) sectionId!: string;
  public commentService = inject(CommentsUseCaseProvider)
  public _comments : IComment[] = []
  public isLoading = false

  constructor(){}

  ngOnInit(){
    this.getComments()
  }

  private getComments(){
    this.isLoading = true
    this.commentService.usecase.getCommentsByParams(`?lesson=${this.sectionId}`)
    .subscribe({
      next: (comments) => this._comments = comments,
      error: (err) => console.log(err)
    }).add(() => this.isLoading = false)
  }
}
