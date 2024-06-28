export interface Notification {
  id: string,
  title: string,
  body: string,
  date: Date,
  userReaded: boolean
}

export interface NotificationToken {
  email:string,
  address:string,
  message:string
}