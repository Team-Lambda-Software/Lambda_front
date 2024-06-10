import { Optional } from "../../../helpers/Optional";
import { ISave } from "../../application/ports/ISave.interface";

export class LocalStorageService implements ISave {
  saveByKeyValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  getByKey(key: string): Optional<string> {
    let item = localStorage.getItem(key)
    if (item) return new Optional<string>(item)
    return new Optional<string>(undefined)
  }
  deleteByKey(key: string): void {
    localStorage.removeItem(key);
  }
  deleteAllKeys(): void {
    localStorage.clear();
  }

}
