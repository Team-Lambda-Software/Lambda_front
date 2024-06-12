import { PartialCourse } from "../../../core/course/domain/course.model";
import { IPlayerCard } from "../interfaces/IPlayerCard";
import { IVideoCourses } from "../interfaces/video-courses-model";

export const PlayerCardAdapter = (data: IVideoCourses): IPlayerCard => {
    return {
        id: data.id,
        thumbnail: data.thumbnail,
        videoUrl: data.videoUrl
    }
}

export const PartialCourseToPlayerCard = (data: PartialCourse): IPlayerCard => {
    return {
        id: data.id,
        thumbnail: data.image,
    }
}
