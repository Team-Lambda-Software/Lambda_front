import { Observable } from "rxjs";
import { AppUser } from "../appuser";
import { Result } from "../../../../common/helpers/Result";

import { LoginEntryDomainDTO } from "../../domain/interfaces/entry/login-entry.dto";
import { SignUpEntryDomainDTO } from "./entry/signup-entry.dto";


export interface IAuthUseCase {
  login(LoginEntryDomainDTO:LoginEntryDomainDTO):Observable<Result<AppUser>>;
  currentUser():Observable<Result<AppUser>>;
  signup(user: SignUpEntryDomainDTO): Observable<Result<AppUser>>
  getCodeUpdatePassword(email:string):Observable<void>;

}
