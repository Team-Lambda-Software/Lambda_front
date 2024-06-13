import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { enviroment } from '../../../../../environments/environment';
import { ICommentApiService } from "../../domain/interfaces/comment-api.interface";
import { IComment, CommentFeatureDto } from "../../domain/comment.model";
import { CommentDto } from "../adapters/dtos/comment.dto";
import { CommentResponseToComment } from "../adapters/converters/CommentResponseToComment";
import { CommentToCreateCommentApiDto } from "../adapters/converters/CommentToCreateCommentDto";

@Injectable()
export class CommentApiService implements ICommentApiService {
    private _httpClient = inject(HttpClient)
    private readonly BASE_URL = enviroment.baseUrl + '/comment'


    getCommentsByParams(params: string): Observable<IComment[]> {
        return this._httpClient.get<CommentDto[]>
            (`${this.BASE_URL}/many${params ?? ''}`)
            .pipe(map(c => c.map(CommentResponseToComment)));
    }
    createComment(data: CommentFeatureDto): Observable<void> {
        let comment= CommentToCreateCommentApiDto(data)
        if(comment.targetType == 'SECTION') comment.targetType = 'LESSON'
        return this._httpClient.post<void>(`${this.BASE_URL}/release`, comment);
    }
}