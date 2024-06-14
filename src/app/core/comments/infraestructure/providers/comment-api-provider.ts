import { InjectionToken, Provider } from '@angular/core';
import { ICommentApiService } from '../../domain/interfaces/comment-api.interface';
import { CommentApiService } from '../services/comment-api.service';

export const HTTP_COMMENT_SERVICE = new InjectionToken<ICommentApiService>('CommentApiService');

export const COMMENT_API_PROVIDER: Provider = { provide: HTTP_COMMENT_SERVICE, useClass: CommentApiService };