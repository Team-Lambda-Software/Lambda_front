import { PartialCourse } from '../../../core/course/domain/course.model';
import { ICard } from '../interfaces/ILittleCard';
import { IBlog } from '../interfaces/blog-model';
import { ICourse } from '../interfaces/course-model';

export const CourseCardAdapter = (course: ICourse): ICard => {
  return {
    id: course.id,
    title: course.category,
    description: course.instructor,
    thumbnail: course.image,
    date: 'Feb 17, 2020',
  };
};

export const PopularCourseCardAdapter = (course: PartialCourse): ICard => {
  return {
    id: course.id,
    title: course.title,
    description: course.trainer,
    thumbnail: course.image,
    date: new Date(course.date).toLocaleDateString(),
  };

}

//TODO: Aqui iria el adapter de un Post si quiere usar un Card para mostrar los post
export const BlogCardAdapter = (blog: IBlog): ICard => {
  return{
    id: blog.id,
    title: blog.title,
    description: blog.category,
    thumbnail: blog.imagenUrl,
    date: blog.date,
  }
}