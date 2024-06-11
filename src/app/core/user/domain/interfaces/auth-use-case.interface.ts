import { Observable } from "rxjs";
import { LoginResponse } from "../../infraestructure/dto/response/login-response.interface";
import { LoginUserData } from "../../../../presentation/auth/interfaces/login-auth.interface";
import { User } from "../user";
import { Result } from "../../../helpers/Result";

export interface IAuthUseCase {
  login(loginUserData:LoginUserData):Observable<Result<User>>;
}
