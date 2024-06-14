import { Injectable, inject } from '@angular/core';
import { LocalStorage } from '../../../auth/services/LocalStorage';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Messaging, onMessage, getToken, getMessaging } from "firebase/messaging";
import * as firebase from 'firebase/app';
import { enviroment } from '../../../../../environments/environment';
import { NotificationTokenResponse } from '../../../../core/notification/infrastructure/adapters/dtos/notification.dto';
import { Optional } from '../../../../common/helpers/Optional';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public messaggingFirebase:Messaging
  private readonly baseUrl:string= enviroment.baseUrl
  private http= inject(HttpClient)
  public _notificationToken: Optional<string>=new Optional()
  private _authToken:Optional<string>=new Optional(localStorage.getItem('token'))

  async saveNotificationToken() {
      return new Promise(async (resolve,reject)=>{
        if(!this._authToken.hasValue()) reject( new Error('not-auth') ) ;
        if (!this._notificationToken.hasValue()) reject( new Error('not-fb-token-registered') )
        const url=`${this.baseUrl}/notifications/savetoken`
        const body = { token: this._notificationToken.getValue() }
        const headers= new HttpHeaders().set('Authorization',`Bearer ${this._authToken.getValue()}`)
        const result = this.http.post<any>(url, body, { headers }).subscribe()
        resolve(result)
      })

    }

    sendGoodDayNotification():Observable<boolean>{

      const url=`${this.baseUrl}/notifications/goodday`

      if (!this._notificationToken.hasValue()) return (
        of(false))

    return this.http.get<NotificationTokenResponse>(url)
      .pipe(
        map((response)=>{
          console.log(response);
          return true
        }),
        catchError((error)=>
          {
            return throwError(()=>error.error.message)
          }
        )
      )
    }

  public async requestPermission(){
    return new Promise(async (resolve,reject)=>{
      const permission=await Notification.requestPermission()
      if (permission=="granted"){
        const tokenFirebase= await getToken(this.messaggingFirebase,{vapidKey:enviroment.firebase.vpaidKey})
        this._notificationToken=new Optional(tokenFirebase)
        resolve( tokenFirebase )
      } else reject( new Error ('No se aceptaron los permisos'))
    })
  }

  public async buildToken() {
    return new Promise(async (resolve,reject)=>{
      const tokenFirebase= await getToken(this.messaggingFirebase,{vapidKey:enviroment.firebase.vpaidKey})
      this._notificationToken=new Optional(tokenFirebase)
      resolve( tokenFirebase )
    })
  }

  constructor() {
    const app=firebase.initializeApp(enviroment.firebase)
    this.messaggingFirebase=  getMessaging(app)

  }

}
