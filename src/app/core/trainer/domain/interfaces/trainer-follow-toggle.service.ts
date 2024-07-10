import { Observable } from "rxjs";

export interface ITrainerFollowToggleService {
  toggle(id: string): Observable<void>;
}
