import { Observable } from "rxjs";
import { CommentFeatureDto, IComment } from "../comment.model";
import { Result } from "../../../../common/helpers/Result";

export interface ICommentApiService{
    getCommentsByParams(params?: string): Observable<IComment[]>;

    createComment(data: CommentFeatureDto): Observable<void>
}