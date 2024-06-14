import { IComment } from "../../../domain/comment.model";
import { CommentDto } from "../dtos/comment.dto";

export const CommentResponseToComment = (data: CommentDto): IComment => {

    let comment: IComment = {
      id: data.id,
      userName: data.user,
      content: data.body,
      date: data.date
    }
  
  return comment
}
