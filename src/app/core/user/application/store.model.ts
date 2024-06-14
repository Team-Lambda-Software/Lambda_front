import { BehaviorSubject, Observable } from 'rxjs';

export abstract class Store<AuthStatus> {
  private state: BehaviorSubject<AuthStatus | null> = new BehaviorSubject<AuthStatus | null>(null);

  getState = (): AuthStatus | null =>{
    if (this.state) return this.state.getValue();
    return null
  }
  getObservable = (): Observable<AuthStatus | null> => {
    return this.state.asObservable();
  }
  store = (nextState: AuthStatus) => this.state.next(nextState);
}
