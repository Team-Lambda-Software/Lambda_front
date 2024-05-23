import { Course } from "../../../domain/course.model";
import { CourseResponse } from "../dtos/courses.dto";

export const convertCourseResponseToCourse = (course: CourseResponse): Course => ({
  ...course
})