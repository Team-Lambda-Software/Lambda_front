import { Optional } from "../../../common/helpers/Optional";
import { AppUser } from "../domain/appuser";
import { Store } from "./Store";

export class UserStore extends Store<Optional<AppUser>> {
  private static store: UserStore;
  private constructor(){
      super(new Optional());
  }
  static getInstance(): UserStore {
      if (!UserStore.store) {
          this.store = new UserStore();
      }
      return this.store;
  }
}
