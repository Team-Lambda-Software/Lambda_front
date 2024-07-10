export interface ProgressCourse {
    lessons: LessonProgress[];
}
export interface LessonProgress {
    lessonId: string;
    time: number;
}