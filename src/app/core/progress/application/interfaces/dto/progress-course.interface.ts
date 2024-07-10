export interface ProgressCourse {
  percent: number;
  lessons: LessonProgress[];
}
export interface LessonProgress {
  lessonId: string;
  time: number;
}

export interface CoursesByUserProgressResponse {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
  trainer: string;
  percent: number;
}