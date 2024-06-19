import { Optional } from "../../../../common/helpers/Optional";

export interface INotificationRepository{
  saveNotificationToken(tokenValue: string):void;
  getNotificationToken():Optional<string>;
  deleteNotificationToken(): void;
}
