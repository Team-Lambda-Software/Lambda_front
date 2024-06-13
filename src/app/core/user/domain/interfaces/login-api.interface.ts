import { Observable } from "rxjs";

import { LoginEntryDomainDTO } from "../../domain/interfaces/entry/login-entry.dto";
import { SignUpEntryDomainDTO } from "../../domain/interfaces/entry/signup-entry.dto";


import { AppUser } from "../appuser";
import { Result } from "../../../../common/helpers/Result";

export interface IAuthApiService{
  login(LoginEntryDomainDTO:LoginEntryDomainDTO): Observable<Result<AppUser>>
  currentUser():Observable<Result<AppUser>>;
  signup(user:SignUpEntryDomainDTO):Observable<Result<AppUser>>;
  getCodeUpdatePassword(email:string):Observable<void>;

}
