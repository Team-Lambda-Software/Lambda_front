import { Optional } from "../../../../common/helpers/Optional";
import { IAuthRepository } from "../../application/ports/IRepository.interface";

export class LocalStorageService implements IAuthRepository {
  private dateCodeKey='dateCode'
  private tokenKey='token'
  private emailKey='email'

  saveToken(tokenValue: string): void {
    localStorage.setItem(this.tokenKey, tokenValue);
  }
  saveEmail(email: string): void {
    localStorage.setItem(this.emailKey, email);
  }
  saveDateCode(dateCodeValue: string): void {
    localStorage.setItem(this.dateCodeKey, dateCodeValue);
  }
  getToken(): Optional<string> {
    let item = localStorage.getItem(this.tokenKey)
    if (item) return new Optional<string>(item)
    return new Optional<string>(undefined)
  }
  getEmail(): Optional<string> {
    let item = localStorage.getItem(this.emailKey)
    if (item) return new Optional<string>(item)
    return new Optional<string>(undefined)  }

  getDateCode(): Optional<string> {
      let item = localStorage.getItem(this.dateCodeKey)
      if (item) return new Optional<string>(item)
      return new Optional<string>(undefined)     }

  deleteToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  deleteEmail(): void {
    localStorage.removeItem(this.emailKey);
  }
  deleteDateCode(): void {
    localStorage.removeItem(this.dateCodeKey);
  }
  deleteAllKeys(): void {
    localStorage.clear();
  }
  constructor(){}

}
