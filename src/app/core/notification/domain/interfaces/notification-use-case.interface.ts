import { Observable } from "rxjs";
import { Notification } from "../notification.model";

export interface INotificationUseCase {
  sendSignUpNotification(email:string):Observable<Boolean>;
  getNotificationByParams(params: string): Observable<Notification[]>;
}