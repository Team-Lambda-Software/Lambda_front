import { Inject, Injectable } from "@angular/core";
import { NotificationUseCaseService } from "../../application/notification-use-case.service";
import { HTTP_NOTIFICATION_SERVICE } from "./notification-api-provider";
import { INotificationApiService } from "../../domain/interfaces/notification-api.interface";
//import { ProxyNotificationUseCase } from "../../application/proxy-notification-use-case.service";
import { INotificationUseCase } from "../../domain/interfaces/notification-use-case.interface";

@Injectable({ providedIn: "root" })
export class NotificationUseCaseProvider {
  public usecase: INotificationUseCase;

  constructor(
    @Inject(HTTP_NOTIFICATION_SERVICE) private _notificationApiService: INotificationApiService
  ) {
    this.usecase = new NotificationUseCaseService(this._notificationApiService)
  }

  //new ProxyNotificationUseCase Pendiente
}