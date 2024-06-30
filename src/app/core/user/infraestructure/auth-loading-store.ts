import { AuthStatus } from "../domain/enum/auth-status.enum";
import { Store } from "./Store";

export class AuthLoadingStore extends Store<AuthStatus> {
  private static store: AuthLoadingStore;
  private constructor(){
      super(AuthStatus.notAuthenticated);
  }
  static getInstance(): AuthLoadingStore {
      if (!AuthLoadingStore.store) {
          this.store = new AuthLoadingStore();
      }
      return this.store;
  }
}
