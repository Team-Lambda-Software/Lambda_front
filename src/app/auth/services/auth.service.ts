import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from '../../../env/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/response/login-response.interface';
import { UserState } from '../interfaces/user-state.interface';
import { UsersResponse } from '../interfaces/response/users-response.interface';
import { SignUpUser } from '../interfaces/signup-user.interface';
import { SignUpResponse } from '../interfaces/response/signup-response.interface';
import { GetCodeResponse } from '../interfaces/response/getCode-response.interface';
import { LocalStorage } from './LocalStorage';
import { VerificationCodeForm } from '../interfaces/forms/verticationCode-form.interface';
import { FormGroup } from '@angular/forms';
import { Optional } from '../../shared/helpers/Optional';
import { UpdatePasswordResponse } from '../interfaces/response/updatePassword-response.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly baseUrl:string= enviroment.baseUrl
  private http= inject(HttpClient)
  private _currentUser=signal <UserState |null>(null)
  private _authStatus= signal<AuthStatus>(AuthStatus.notAuthenticated);
  private localStorage:LocalStorage= new LocalStorage('','')
  private code=new Optional<string>(undefined)
  private email=''
  public currentUser=computed(()=>this._currentUser)
  public _hasCode=(false)
  public _hasCodeVerified=(false)


  public authStatus=computed(()=>this._authStatus())
  constructor() { }

  private setAuthtication(newUser:UserState):boolean{
    this._currentUser.set(newUser)
    this._authStatus.set(AuthStatus.authenticated)
    return true
  }

  private createUser(responseData:LoginResponse):UserState{
    const {token,...response}= responseData
    let newUser:UserState={
      ...response,
    }
    return newUser
  }


  login(email:string,password:string):Observable<boolean>{

    const url=`${this.baseUrl}/auth/loginuser`
    const body={email,password}

    return this.http.post<LoginResponse>(url,body)
      .pipe(
        map((response)=>{
          let newUser=this.createUser(response);
          this.localStorage.SaveLocalStorage('token',response.token)
          return this.setAuthtication(newUser)
          // console.log(response);
        }),
        catchError(error=>{
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
    }

    signup(user:SignUpUser):Observable<boolean>{

      const url=`${this.baseUrl}/auth/signupuser`
      const body={...user,}

      return this.http.post<SignUpResponse>(url,body)
        .pipe(
          map((response)=>{
            let newUser=this.createUser(response);
            this.localStorage.SaveLocalStorage('token',response.token)
            return this.setAuthtication(newUser)
            // console.log(response);
          }),
          catchError(error=>{
            console.log(error);
            return throwError(()=>error.error.message)
          })
        )
      }

  getCodeUpdatePassword(email:string):Observable<GetCodeResponse>{

    const url=`${this.baseUrl}/auth/getcodeupdatepassword`;
    const body={email}
    this.localStorage.SaveLocalStorage('email',email)

    return this.http.post<GetCodeResponse>(url,body)
      .pipe(
        map((response)=>{
          this.localStorage.SaveLocalStorage('date',response.date.toString())
          this._hasCode=true
          this.email=response.email
          this.code.setValue(response.code);
          console.log(response.code);


          // console.log(JSON.stringify(this._hasCode));

          return response
        }),
        catchError(error=>{
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
    // const headers= new HttpHeaders()
    //   .set(`Authorization`,`Bearer ${token}`);

    //     return this.http.get<UsersResponse>(url,{headers})
    //       .pipe(
    //         map((response)=>{
    //           let newUser=this.createUser(response);
    //           this.saveLocalStorage(response.token)
    //           return this.setAuthtication(newUser)
    //         }),

    //           catchError(()=>
    //             {
    //               this._authStatus.set(AuthStatus.notAuthenticated)
    //               return of(false)
    //             })
    //       )
  }
  verificateLocalCode(verificationCodeForm:FormGroup<VerificationCodeForm>):boolean{
    let data=verificationCodeForm.value
    let numbers=Object.values(data);
    let code:string=numbers.join('')

    // console.log(this.code.getValue());
    // console.log(code);

    if (this.code.hasValue()){
      if (this.code.getValue()===code){
        this._hasCodeVerified=true
        // this.localStorage.deleteLocalStorage('code')
        return true
      }
    }
    return false
  }

  updatePassword(password:string):Observable<boolean>{

    const url=`${this.baseUrl}/auth/updatepassword`
    const body={
      email:this.email,
      password,
      code:this.code.getValue()
    }

    console.log(body);

    return this.http.post<UpdatePasswordResponse>(url,body)
      .pipe(
        map((response)=>{
          return true
        }),
        catchError(error=>{
          console.log(error);
          return throwError(()=>error.error.message)
        })
      )
    }


}
