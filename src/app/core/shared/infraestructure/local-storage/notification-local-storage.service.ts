import { Optional } from "../../../../common/helpers/Optional";
import { INotificationRepository } from "../../application/ports/INotificationRepository.interface";

export class NotificationLocalStorageService implements INotificationRepository {
  private notificationTokenKey='NotificationToken'

  saveNotificationToken(tokenValue: string): void {
    localStorage.setItem(this.notificationTokenKey, tokenValue);
  }
  getNotificationToken(): Optional<string> {
    let item = localStorage.getItem(this.notificationTokenKey)
    if (item) return new Optional<string>(item)
    return new Optional<string>(undefined)
  }
  deleteNotificationToken(): void {
    localStorage.removeItem(this.notificationTokenKey);
  }

}
