
import { AppUser } from "../appuser";
import { Result } from "../../../../common/helpers/Result";
import { Observable } from "rxjs";
import { UserType } from "./Usertype.interface";

export interface IAuthApiComunication{
  login(email:string,password:string): Observable<Result<string>>
  currentUser(token:string):Observable<Result<AppUser>>;
  signup(
    email: string,
    name: string,
    password: string,
    phone: string,
    type: UserType
  ):Observable<Result<string>>;

  getCodeUpdatePassword(email:string):Observable<void>;
  verificateCode(email:string,code:string):Observable<number>;
  updatePassword(email:string,code:string,password:string):Observable<number>;
}
