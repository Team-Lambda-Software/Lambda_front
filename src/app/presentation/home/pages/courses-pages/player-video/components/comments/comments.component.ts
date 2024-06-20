import { Component, Input, Signal, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@jsverse/transloco';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { CommentFeatureDto, ETarget, IComment } from '../../../../../../../core/comments/domain/comment.model';
import { SquareSkeletonComponent } from '../../../../../../shared/components/square-skeleton/square-skeleton.component';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [TranslocoModule, FormsModule, SquareSkeletonComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  @Input({ required: true }) sectionId!: Signal<string>;
  public commentService = inject(CommentsUseCaseProvider)
  public _comments : IComment[] = []
  public isLoading = false;
  public newComment = '';


  constructor(){
    effect(() => this.getComments())
  }

  public getComments(): void{
    this.isLoading = true
    this.commentService.usecase.getCommentsByParams(`?perPage=10&page=0&lesson=${this.sectionId()}`)
    .subscribe({
      next: (comments) => this._comments = comments,
      error: (err) => console.log(err)
    }).add(() => this.isLoading = false)
  }

  public setNewComment(): void{
    if(this.newComment.length > 0){
      let comment = new CommentFeatureDto(this.sectionId(), ETarget.section ,this.newComment)
      this.commentService.usecase.createComment(comment)
      .subscribe({
        next: () => this.getComments(),
        error: (err) => console.log(err)
      }).add(() => this.newComment = '')
    }
  }

}
