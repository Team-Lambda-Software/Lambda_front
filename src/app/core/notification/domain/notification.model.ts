export interface Notification {
  title: string,
  body: string,
  date: string,
  userReaded: boolean
}

export interface NotificationToken {
  email:string,
  address:string,
  message:string
}