import { Injectable, Inject } from "@angular/core";
import { ICommentApiService } from "../../domain/interfaces/comment-api.interface";
import { ICommentUseCase } from "../../domain/interfaces/comment-use-case.interface";
import { HTTP_COMMENT_SERVICE } from "./comment-api-provider";
import { CommentsUseCaseService } from "../../application/comments-use-case.service";

@Injectable({providedIn: 'root'})
export class CommentsUseCaseProvider {
    public usecase: ICommentUseCase;

  constructor(
    @Inject(HTTP_COMMENT_SERVICE) private _commentApiService: ICommentApiService
  ) {
    this.usecase = new CommentsUseCaseService(this._commentApiService)
  }
}