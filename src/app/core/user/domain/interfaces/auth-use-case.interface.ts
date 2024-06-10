import { Observable } from "rxjs";
import { Result } from "../../../helpers/Result"
import { LoginResponse } from "../../infraestructure/dto/response/login-response.interface";

export interface IAuthUseCase {
  login(email:string,password:string):Result<Observable<LoginResponse>>;
}
