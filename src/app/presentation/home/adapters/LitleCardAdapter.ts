import { Course, PartialCourse } from '../../../core/course/domain/course.model';
import { CoursesByUserProgress } from '../../../core/progress/domain/progress.model';
import { TrainerDetail } from '../../../core/trainer/domain/trainer.model';
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

export const CoursesByUserProgressToILittleCard = (course: CoursesByUserProgress): ILittleCard => {
  return {
    id: course.id,
    title: course.title,
    description: course.category,
    thumbnail: course.image
  }
}

export const TrainerDetailToILittleCard = (trainer: TrainerDetail): ILittleCard => {
  return {
    id: trainer.id,
    title: trainer.name,
    description: 'followers: ' + trainer.followers.toString(),
    // TA' CHIMBO, PERO QUÉ LE VAMOS A HACER, ESTO SE ENTREGA MAÑANA
    thumbnail: [
      'https://cdnb.artstation.com/p/assets/images/images/033/885/779/large/caio-fernandes-1288b8b9-187d-4812-a73f-1dd14c9bb8d3.jpg?1610822483',
      'https://ginastic-center.web.app/assets/images/no-profile-img.jpg',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150517171.jpg',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503812.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720569600&semt=ais_hybrid',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503834.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720569600&semt=ais_hybrid',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503847.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720569600&semt=ais_hybrid',
      'https://cdn.dribbble.com/users/8309782/screenshots/17981401/media/5772ee39311b670f8ffe00052b4e48e3.jpg?resize=400x0',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg',
      'https://img.freepik.com/premium-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503791.jpg',
      'https://img.freepik.com/premium-vector/young-man-avatar-cartoon-character-profile-picture_18591-55055.jpg',
      'https://img.freepik.com/premium-vector/young-man-avatar-cartoon-character-profile-picture_18591-55058.jpg?w=360',
      'https://img.freepik.com/premium-vector/young-woman-avatar-cartoon-character-profile-picture_18591-55054.jpg'

    ].at(Math.floor(Math.random() * 12))!
  }
}

export const BlogLitleCardAdapter = (data: IBlog): ILittleCard => {
  return {
    id: data.id,
    title: data.instructor,
    description: data.category,
    thumbnail: data.imagenUrl,
  };
}

