import { Course, PartialCourse } from '../../../core/course/domain/course.model';
import { ILittleCard } from '../interfaces/ILittleCard';
import { IBlog } from '../interfaces/blog-model';
import { ICourse } from '../interfaces/course-model';

export const CourseLitleCardAdapter = (data: ICourse): ILittleCard => {
  return {
    id: data.id,
    title: data.instructor,
    description: data.category,
    thumbnail: data.image,
  };
};

export const CourseToILittleCard = (course: Course): ILittleCard => {
  return {
    title: course.title,
    description: course.description,
    thumbnail: course.image
  }
}

export const PartialCourseToILittleCard = (course: PartialCourse): ILittleCard => {
  return {
    id: course.id,
    title: course.title,
    description: course.category,
    thumbnail: course.image
  }
}

// TODO: Aqui iria el adapter de un Post si quiere usar un LitleCard para mostrar los post

export const BlogLitleCardAdapter = (data: IBlog): ILittleCard => {
  return {
    id: data.id,
    title: data.instructor,
    description: data.category,
    thumbnail: data.imagenUrl,
  };
}