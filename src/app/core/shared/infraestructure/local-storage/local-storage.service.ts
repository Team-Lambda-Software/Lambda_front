import { Optional } from "../../../helpers/Optional";
import { IRepository } from "../../application/ports/IRepository.interface";

export class LocalStorageService implements IRepository {
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
  constructor(){}

}
