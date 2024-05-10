import { IPlayerCard } from "../interfaces/IPlayerCard";
import { IVideoCourses } from "../interfaces/video-courses-model";

export const PlayerCardAdapter = (data: IVideoCourses): IPlayerCard => {
    return {
        id: data.id,
        thumbnail: data.thumbnail,
        videoUrl: data.videoUrl
    }
}