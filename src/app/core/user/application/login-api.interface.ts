import { Observable } from "rxjs";
import { IApplicationService } from "../../shared/application/application-service.interface";

export interface ILoginService extends IApplicationService< string,Observable<boolean>>{
  login(email:string,password:string):Observable<boolean>
}
