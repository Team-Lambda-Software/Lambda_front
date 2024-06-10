import { Observable } from "rxjs";
import { LoginResponse } from "../../infraestructure/dto/response/login-response.interface";

export interface ILoginApiService{
  login(email:string,password:string):Observable<LoginResponse>
}
