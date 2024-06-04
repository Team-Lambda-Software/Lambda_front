import { SearchModel } from "../../../domain/search-model";
import { SearchDto } from "../dto/search.dto";

export const SearchResponseToSearch = (data: SearchDto): SearchModel => ({
    blogs: data.blogs,
    courses: data.courses,
});