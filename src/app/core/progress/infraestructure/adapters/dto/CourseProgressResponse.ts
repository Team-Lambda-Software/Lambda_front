// {
//   "percent": 21.11,
//   "lessons": [
//     {
//       "lessonId": "d1381133-a423-475a-9947-eefd3cfdb1bd",
//       "time": 20,
//       "percent": 21.11
//     }
//   ]
// }

export interface CourseProgressResponse {
    percent: number;
    lessons: LessonProgressResponse[];
}

export interface LessonProgressResponse {
    lessonId: string;
    time: number;
    percent: number;
}