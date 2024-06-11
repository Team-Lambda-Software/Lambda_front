import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { enviroment } from '../../../../environments/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { AuthStatus } from '../../../core/user/domain/interfaces/auth-status.enum';
import { LoginResponse } from '../../../core/user/infraestructure/dto/response/login-response.interface';
import { User } from '../../../core/user/infraestructure/dto/response/user-response.interface';
import { SignUpResponse } from '../../../core/user/infraestructure/dto/response/signup-response.interface';
import { GetCodeResponse } from '../../../core/user/infraestructure/dto/response/getCode-response.interface';
import { LocalStorage } from './LocalStorage';
import { VerificationCodeForm } from '../interfaces/forms/verticationCode-form.interface';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Optional } from '../../../common/helpers/Optional';
import { SignUpUser } from '../../../core/user/infraestructure/dto/entry/signup-user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private router = inject(Router);
  private readonly baseUrl:string= enviroment.baseUrl
  private http= inject(HttpClient)
  private _currentUser=signal <User |null>(null)
  private _authStatus= signal<AuthStatus>(AuthStatus.notAuthenticated);
  private localStorage:LocalStorage= new LocalStorage('','');
  private code=new Optional<string>(undefined);
  public currentUser=computed(()=>this._currentUser());
  public _hasCode=(false);
  public _hasCodeVerified=(false);
  public authStatus=computed(()=>this._authStatus());
  private _hasError:boolean=false;
  public hasError=this._hasError

  constructor() {
    this.current().subscribe()
  }

  private changeError(){
    this._hasError=!this._hasError
  }
  private setAuthtication(newUser:User):boolean{
    this._currentUser.set(newUser)
    this.setAuthenticaded()
    return true
  }

  private setChecking():void{
    this._authStatus.set(AuthStatus.checking)
  }

  private setAuthenticaded():void{
    this._authStatus.set(AuthStatus.authenticated)
  }
  private setNotAuthenticated():void{
    this._authStatus.set(AuthStatus.notAuthenticated)
  }

  private createUser(responseData:LoginResponse):User{
    const {token,type,...response}= responseData
    let newUser:User={
      ...response.user
    }
    //TODO Quitar por defecto esta imagen en caso que no tenga imagen el usuario
    newUser.image="https://via.placeholder.com/40"
    return newUser
  }

  current():Observable<boolean>{
    const url=`${this.baseUrl}/auth/current`
    const token=this.localStorage.LoadLocalStorage('token')
    this.setChecking();

    if( !token.hasValue()) return (
      this.setNotAuthenticated(),
      of(false))

    const headers= new HttpHeaders()
    .set('Authorization',`Bearer ${token.getValue()}`)

    return this.http.get<User>(url,{headers})
      .pipe(
        map((response)=>{
          return this.setAuthtication(response)
        })
      )
  }


  login(email:string,password:string):Observable<boolean>{

    const url=`${this.baseUrl}/auth/login`
    const body={email,password}
    this.setChecking();

    return this.http.post<LoginResponse>(url,body)
      .pipe(
        map((response)=>{
          let newUser=this.createUser(response);
          this.localStorage.SaveLocalStorage('token',response.token)
          return this.setAuthtication(newUser)
          // console.log(response);
        }),
        catchError(error=>{
          this.setNotAuthenticated();
          console.log(error);
          this.changeError();
          return throwError(()=>error.error.message)
        })
      )
    }

    signup(user:SignUpUser):Observable<boolean>{

      const url=`${this.baseUrl}/auth/register`
      const body={...user}
      this.setChecking();

      return this.http.post<SignUpResponse>(url,body)
        .pipe(
          map((response)=>{
            this.login(user.email,user.password)
            this.setAuthenticaded();

            return true
            // console.log(response);
          }),
          catchError(error=>{
            this.setNotAuthenticated();
            console.log(error);
            return throwError(()=>error.error.message)
          })
        )
      }

  getCodeUpdatePassword(email:string):Observable<GetCodeResponse>{

    const url=`${this.baseUrl}/auth/forget/password`;
    const body={email}
    this.localStorage.SaveLocalStorage('email',email)
    this.setChecking();

    return this.http.post<GetCodeResponse>(url,body)
      .pipe(
        map((response)=>{
          this.localStorage.SaveLocalStorage('date',response.date.toString())
          this._hasCode=true
          console.log(response.date);
          console.log(new Date( response.date + 1000 * (60 * 5) )
        )
          this.setNotAuthenticated();
          return response
        }),
        catchError(error=>{
          this.setNotAuthenticated();
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
  }


  verificateLocalCode(verificationCodeForm:FormGroup<VerificationCodeForm>):Observable<HttpResponseBase>{
    let data=verificationCodeForm.value
    let numbers=Object.values(data);
    let code:string=numbers.join('')
    let email=this.localStorage.LoadLocalStorage('email')
    const url=`${this.baseUrl}/auth/code/validate`

    if (!email.hasValue()) email.setValue('')
    this.setChecking();
    const body={email:email.getValue(),code}
    console.log(url,body);


    return this.http.post<HttpResponseBase>(url,body,{ observe: 'response' })
      .pipe(
        map((response)=>{
          this.setNotAuthenticated();
          console.log(response);
          this._hasCodeVerified=(true);
          this.code=new Optional(code)
          return response
        }),
        catchError(error=>{
          this.setNotAuthenticated();
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )

  }

  updatePassword(password:string):Observable<HttpResponseBase>{

    const url=`${this.baseUrl}/auth/change/password`
    let email=this.localStorage.LoadLocalStorage('email')

    const body={
      email:email.getValue(),
      password,
      code:this.code.getValue()
    }
    this.setChecking();
    console.log(body);

    return this.http.put<HttpResponseBase>(url,body,{ observe: 'response' })
      .pipe(
        map((response)=>{
          this.setNotAuthenticated()
          return response
        }),
        catchError(error=>{
          this.setNotAuthenticated()
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
    }



  logout (): void {
    this.localStorage.deleteLocalStorage('token');
    this.setNotAuthenticated()
    this._currentUser.set(null)
    this.router.navigate(['/auth'])
  }
}
