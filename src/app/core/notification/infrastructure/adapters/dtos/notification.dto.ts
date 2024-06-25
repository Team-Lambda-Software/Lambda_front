export interface NotificationResponse {
  id: string,
  title: string,
  body: string,
  date: Date,
  userReaded: boolean
}

export interface NotificationTokenResponse {
  email:string,
  address:string,
  message:string
}

export interface NotificationCountResponse{
  count:number
}