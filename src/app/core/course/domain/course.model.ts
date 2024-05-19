import { Trainer } from "../../trainer/domain/trainer.model"

export interface Course {
  id: string
  trainer: Trainer
  name: string
  description: string
  weeksDuration: number
  minutesPerSection: number
  level: number
  sections: CourseSection[]
  categoryId: string
  image: Image
  tags: string[]
}

export interface CourseSection {
  id: string
  name: string
  description: string
  videos: any[]
  images: any[]
  paragraph: any
}

export interface Image {
  id: string
  url: string
}

export interface Progress<T> {
  progress: T
  completionPercent: number
}

export interface CourseProgress {
  sections: any
  userId: string
  courseId: string
  isCompleted: boolean
}

export interface SectionProgress {
  videos: any
  userId: string
  sectionId: string
  isCompleted: boolean
}

export interface FullCourse {
  course: Course,
  courseProgress: Progress<CourseProgress>,
  sectionsProgress: Progress<SectionProgress>[]
}