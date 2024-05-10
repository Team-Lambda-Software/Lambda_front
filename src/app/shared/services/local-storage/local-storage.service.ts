import { Optional } from "../../helpers/Optional"

export class LocalStorageService {

  static save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static get(key: string): Optional<string> {
    let item = localStorage.getItem(key)
    if (item) return new Optional<string>(item)
    return new Optional<string>(undefined)
  }

  static delete(key: string): void {
    localStorage.removeItem(key);
  }

  static clearAll(): void {
    localStorage.clear();
  }

}
