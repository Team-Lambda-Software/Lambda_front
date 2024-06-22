import { Observable } from "rxjs";
import { Notification } from "../notification.model";

export interface INotificationUseCase {
  getNotificationByParams(params: string): Observable<Notification[]>;
  getNotificationCountNotRead(): Observable<number>;
}