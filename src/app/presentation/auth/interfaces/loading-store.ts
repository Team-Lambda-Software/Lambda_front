import { Store } from "./Store";

export class LoadingStore extends Store<boolean> {
  private static store: LoadingStore;
  private constructor(){
      super(false);
      this.hide();
  }
  static getInstance(): LoadingStore {
      if (!LoadingStore.store) {
          this.store = new LoadingStore();
      }
      return this.store;
  }
  show() {this.store(true);}

  hide() {this.store(false);}
}
