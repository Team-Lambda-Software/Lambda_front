import { Trainer } from "../../../../trainer/domain/trainer.model"
import { Course, Lesson } from "../../../domain/course.model"

export interface CourseResponse {
  title: string
  description: string
  category: string
  image: string
  trainer: Trainer
  level: string
  durationWeeks: number
  durationMinutes: number
  tags: string[]
  date: string
  lessons: Lesson[]
}

export type PartialCourseResponse = Pick<Course, "title" | "image" | "date" | "category"> & {
  id: string;
  trainer: string
};