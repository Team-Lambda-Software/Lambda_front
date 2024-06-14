import { Observable } from "rxjs";

import { LoginEntryDomainDTO } from "./entry/login-entry.dto";
import { SignUpEntryDomainDTO } from "./entry/signup-entry.dto";


import { AppUser } from "../appuser";
import { Result } from "../../../../common/helpers/Result";

export interface IAuthApiService{
  login(LoginEntryDomainDTO:LoginEntryDomainDTO): Observable<Result<AppUser>>
  currentUser():Observable<Result<AppUser>>;
  signup(user:SignUpEntryDomainDTO):Observable<Result<AppUser>>;
  getCodeUpdatePassword(email:string):Observable<void>;
  verificateCode(code:string):Observable<number>;
  updatePassword(password:string):Observable<Number>;
  logout (): void
}
