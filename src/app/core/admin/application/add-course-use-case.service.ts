import { Observable } from "rxjs";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";
import { AddCourseAdminDto } from "./interfaces/dto/add-course-dto";
import { Result } from "../../../common/helpers/Result";
import { IAdminAddCourse } from "./interfaces/admin-add-course.interface";


export class AddCourseAdminUseCase implements IUseCase<AddCourseAdminDto,Observable<Result<number>>>  {

  constructor(private adminCreateBlog : IAdminAddCourse){}
  execute(data: AddCourseAdminDto): Observable<Result<number>> {
    return this.adminCreateBlog.execute(data)
  }
}
