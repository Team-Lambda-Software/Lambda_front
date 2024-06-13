import { Observable } from "rxjs";
import { CommentFeatureDto, IComment } from "../comment.model";

export interface ICommentUseCase{
    getCommentsByParams(params: string): Observable<IComment[]>;

    createComment(data: CommentFeatureDto): Observable<void>
}