import { CommentFeatureDto } from "../../../domain/Comment";
import { CreateComentApiDto } from "../dtos/create-comment.dto";

export const CommentToCreateCommentApiDto = (data: CommentFeatureDto): CreateComentApiDto => {  

    let comment: CreateComentApiDto = {
        targetId: data.IdTarget,
        targetType: data.Target.toString().toUpperCase(),
        body: data.Comment
    }  
  return comment
}
