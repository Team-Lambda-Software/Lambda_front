import { Optional } from "../../../../common/helpers/Optional";
import { IAuthRepository } from "../../application/ports/IRepository.interface";

export class LocalStorageService implements IAuthRepository {
  private tokenKey='token'

  saveToken(tokenValue: string): void {
    localStorage.setItem(this.tokenKey, tokenValue);
  }
  getToken(): Optional<string> {
    let item = localStorage.getItem(this.tokenKey)
    if (item) return new Optional<string>(item)
    return new Optional<string>(undefined)
  }
  deleteToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  deleteAllKeys(): void {
    localStorage.clear();
  }
  constructor(){}

}
