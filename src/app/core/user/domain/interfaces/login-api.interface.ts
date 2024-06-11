import { Observable } from "rxjs";
import { LoginUserData } from "../../../../presentation/auth/interfaces/login-auth.interface";
import { User } from "../user";
import { Result } from "../../../helpers/Result";

export interface IAuthApiService{
  login(loginUserData:LoginUserData): Observable<Result<User>>
}
