import { PartialBlog } from "../../../core/blog/domain/blog.model";
import { ILatestBlogs } from "../interfaces/latest-blogs-model";

export const BlogAdapter = (blog: PartialBlog): ILatestBlogs => ({
  id: blog.id,
  image: blog.image,
  name: blog.title,
  description: blog.description
})