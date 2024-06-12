import { Observable } from "rxjs";
import { CommentFeatureDto, IComment } from "../Comment";

export interface ICommentUseCase{
    getCommentsByParams(params: string): Observable<IComment[]>;

    createComment(data: CommentFeatureDto): Observable<void>
}