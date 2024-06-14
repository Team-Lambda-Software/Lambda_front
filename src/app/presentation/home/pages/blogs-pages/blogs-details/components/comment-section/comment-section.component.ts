import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommentsUseCaseProvider } from '../../../../../../../core/comments/infraestructure/providers/category-use-case-provider';
import { IComment } from '../../../../../../../core/comments/domain/comment.model';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input({required: true}) blogId!: string;
  private commentUseCase = inject(CommentsUseCaseProvider);
  public comments = signal<IComment[]>([]);

  ngOnInit() {
    this.commentUseCase.usecase
      .getCommentsByParams(`?perPage=10&page=0&blog=${this.blogId}`)
      .subscribe(this.comments.set);
  }
}
