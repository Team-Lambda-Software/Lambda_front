import { BehaviorSubject, Observable } from 'rxjs';

export abstract class Store<T> {

    private state: BehaviorSubject<T>;

    get = (): T => this.state.getValue();

    getObservable = (): Observable<T> => this.state.asObservable();

    store = (nextState: T) => this.state.next(nextState);

    constructor(initialValue: T) {
      this.state = new BehaviorSubject<T>(initialValue);
  }

}
