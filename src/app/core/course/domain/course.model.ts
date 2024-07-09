import { Trainer } from "../../trainer/domain/trainer.model"

export interface Course {
  title: string
  description: string
  category: string
  image: string
  trainer: Pick<Trainer, "id" | "name">
  level: string
  durationWeeks: number
  durationMinutes: number
  tags: string[]
  date: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  content: string
  video: any
  image: string
}

export type PartialCourse = Pick<Course, "title" | "image" | "date" | "category"> & {
  id: string;
  trainer: string
};