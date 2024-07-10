import { Observable } from "rxjs";
import { AddCourseAdminDto } from "./dto/add-course-dto";
import { Result } from "../../../../common/helpers/Result";

export interface IAdminAddCourse {
  execute(params: AddCourseAdminDto): Observable<Result<number>>
}
