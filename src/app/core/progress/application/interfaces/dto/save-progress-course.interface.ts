// {
//     "courseId": "a94d9eb1-efab-43a3-97d6-31f1236b198b",
//     "markAsCompleted": false,
//     "lessonId": "a94d9eb1-efab-43a3-97d6-31f1236b198b",
//     "time": 21,
//     "totalTime": 2111
//   }

export interface SaveProgressCourse {
    courseId: string,
    markAsCompleted: boolean,
    lessonId: string,
    time: number,
    totalTime: number
}