import { Observable } from "rxjs";
import { CommentFeatureDto, IComment } from "../domain/comment.model";
import { ICommentUseCase } from "../domain/interfaces/comment-use-case.interface";
import { ICommentApiService } from "../domain/interfaces/comment-api.interface";

export class CommentsUseCaseService implements ICommentUseCase {
	constructor(private _commentsApiService: ICommentApiService) {}
  
  getCommentsByParams(params?: string): Observable<IComment[]> {
    return this._commentsApiService.getCommentsByParams(params);
  }

  createComment(data: CommentFeatureDto): Observable<void> {
    return this._commentsApiService.createComment(data);
  }
}
