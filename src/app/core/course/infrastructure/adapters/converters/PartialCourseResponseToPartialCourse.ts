import { PartialCourse } from "../../../domain/course.model";
import { PartialCourseResponse } from "../dtos/courses.dto";

export const convertPartialCourseResponseToPartialCourse = (course: PartialCourseResponse): PartialCourse => ({
  ...course
})