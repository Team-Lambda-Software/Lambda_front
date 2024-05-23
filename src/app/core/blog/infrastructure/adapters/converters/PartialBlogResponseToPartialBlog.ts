import { PartialBlog } from "../../../domain/blog.model";
import { PartialBlogResponse } from "../dtos/blog.dto";

export const PartialBlogResponseToPartialBlog = (blog: PartialBlogResponse): PartialBlog => ({
  ...blog
})