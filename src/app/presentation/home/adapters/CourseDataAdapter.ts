import { ICourse } from "../interfaces/course-model"

export const CourseDataAdapter = (data : any): ICourse => {
    return {
        id: data.id,
        category: data.category,
        description: data.description,
        image: data.image,
        level: data.level,
        weeks: data.weeks,
        mins: data.mins,
        instructor: data.instructor
    }
}