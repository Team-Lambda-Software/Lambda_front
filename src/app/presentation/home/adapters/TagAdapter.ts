import { IProgram } from '../interfaces/ILittleCard';
import { ICourse } from '../interfaces/course-model';

export const CourseTagAdapter = (data: ICourse): IProgram => {
  return {
    id: data.id,
    title: data.category,
    level: data.level,
    thumbnail: data.image,
    description: data.instructor,
  };
};

//TODO: Aqui iria un adapter para el tag de lo post en el caso de que lo necesitaramos