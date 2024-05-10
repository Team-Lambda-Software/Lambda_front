import { ICard } from '../interfaces/ILittleCard';
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


//TODO: Aqui iria el adapter de un Post si quiere usar un Card para mostrar los post