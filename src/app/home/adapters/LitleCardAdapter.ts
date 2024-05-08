import { ILittleCard } from '../interfaces/ILittleCard';
import { ICourse } from '../interfaces/course-model';

export const CourseLitleCardAdapter = (data: ICourse): ILittleCard => {
  return {
    id: data.id,
    title: data.instructor,
    description: data.category,
    thumbnail: data.image,
  };
};

// TODO: Aqui iria el adapter de un Post si quiere usar un LitleCard para mostrar los post