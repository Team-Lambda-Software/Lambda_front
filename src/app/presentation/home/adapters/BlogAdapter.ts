import { PartialBlog } from "../../../core/blog/domain/blog.model";
import { ICard, ILittleCard } from "../interfaces/ILittleCard";

export const PartialBlogToILittleCardAdapter = (blog: PartialBlog): ILittleCard => ({
  id: blog.id,
  thumbnail: blog.image,
  title: blog.title,
  description: blog.description
})

export const PartialBlogToICardAdapter = (blog: PartialBlog): ICard => ({
  id: blog.id,
  title: blog.title,
  description: blog.description,
  thumbnail: blog.image,
  date: new Date(blog.date).toLocaleDateString()
})