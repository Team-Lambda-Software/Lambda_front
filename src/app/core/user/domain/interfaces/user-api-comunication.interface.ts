import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { UpdateUSerEntryApplicationDTO } from "../../application/entry/update-user-entry.dto";

export interface IUSerApiComunication{
  updateUser(data:UpdateUSerEntryApplicationDTO): Observable<Result<string>>
}
