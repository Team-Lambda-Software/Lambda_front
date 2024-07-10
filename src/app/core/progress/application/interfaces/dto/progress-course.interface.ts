export interface ProgressCourse {
    percent: number;
    lessons: LessonProgress[];
}
export interface LessonProgress {
    lessonId: string;
    time: number;
    percent: number;
}