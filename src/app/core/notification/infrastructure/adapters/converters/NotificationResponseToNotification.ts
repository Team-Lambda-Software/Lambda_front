import { Notification, NotificationToken } from "../../../domain/notification.model";
import { NotificationResponse, NotificationTokenResponse } from "../dtos/notification.dto";


export const NotificationResponseToNotification = (notification: NotificationResponse): Notification => ({
  ...notification
})

export const NotificationTokenResponseToNotificationToken = (notificationtoken: NotificationTokenResponse): NotificationToken => ({
  ...notificationtoken
})