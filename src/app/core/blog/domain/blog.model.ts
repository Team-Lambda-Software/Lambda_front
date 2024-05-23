import { Trainer } from "../../trainer/domain/trainer.model"

export interface Blog {
  title: string
  description: string
  category: string
  images: string[]
  trainer: Trainer
  tags: string[]
  date: string
}

export type PartialBlog = Pick<Blog, "title" | "description" | "category" | "date"> & {
  id: string,
  trainer: string,
  image: string
}