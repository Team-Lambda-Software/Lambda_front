import { CommentFeatureDto } from "../../../domain/comment.model";
import { CreateComentApiDto } from "../dtos/create-comment.dto";

export const CommentToCreateCommentApiDto = (data: CommentFeatureDto): CreateComentApiDto => {  

    let comment: CreateComentApiDto = {
        target: data.IdTarget,
        targetType: data.Target,
        body: data.Comment
    }  
  return comment
}
