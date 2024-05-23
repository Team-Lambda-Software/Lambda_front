import { Blog } from "../../../domain/blog.model";
import { BlogResponse } from "../dtos/blog.dto";

export const BlogResponseToBlog = (blog: BlogResponse): Blog => ({
  ...blog
})