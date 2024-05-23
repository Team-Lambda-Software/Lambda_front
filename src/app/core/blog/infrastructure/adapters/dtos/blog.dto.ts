import { Trainer } from "../../../../trainer/domain/trainer.model"

export interface BlogResponse {
  title: string
  description: string
  category: string
  images: string[]
  trainer: Trainer
  tags: string[]
  date: string
}

export type PartialBlogResponse = Pick<BlogResponse, "title" | "description" | "category" | "date"> & {
  id: string,
  trainer: string,
  image: string
}