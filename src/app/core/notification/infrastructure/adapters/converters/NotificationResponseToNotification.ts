import { Notification, NotificationToken } from "../../../domain/notification.model";
import { NotificationResponse, NotificationTokenResponse } from "../dtos/notification.dto";


export const NotificationResponseToNotification = (notification: NotificationResponse): Notification => ({
  title:notification.title,
  body:notification.body,
  date:notification.date,
  userReaded:notification.userReaded
})

export const NotificationTokenResponseToNotificationToken = (notificationtoken: NotificationTokenResponse): NotificationToken => ({
  ...notificationtoken
})