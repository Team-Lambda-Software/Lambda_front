import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { AddSectionAdminDto } from "./dto/add-section-dto";

export interface IAddminAddSection {
  execute(params: AddSectionAdminDto): Observable<Result<number>>
}
