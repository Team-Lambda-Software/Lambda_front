import { Observable } from "rxjs";
import { Notification } from "../notification.model";

export interface INotificationApiService {
  getNotificationByParams(params: string): Observable<Notification[]>;
}