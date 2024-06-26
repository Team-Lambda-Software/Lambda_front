import { HttpClient, HttpResponseBase } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUserRepository } from "../../domain/repository/user-repository.interface";
import { GetCodeResponse } from "../dto/response/getCode-response.interface";
import { LoginResponse } from "../dto/response/login-response.interface";
import { SignUpResponse } from "../dto/response/signup-response.interface";
import { User } from "../dto/response/user-response.interface";
import { inject } from "@angular/core";
import { enviroment } from "../../../../../environments/environment";
import { UserType } from "../../domain/enum/type.enum";

export class ApiUserRepository implements IUserRepository {

    httpClient = inject(HttpClient)
    readonly BASE_URL:string= enviroment.baseUrl+`/auth`
  
    constructor(){}

    login(email: string, password: string): LoginResponse {
        throw new Error("Method not implemented.");
    }
    currentUser(): Observable<User> {
        throw new Error("Method not implemented.");
    }
    signUp(email: string, name: string, password: string, phone: string, type: UserType): Observable<SignUpResponse> {
        throw new Error("Method not implemented.");
    }
    getCodeUpdatePassword(email: string): GetCodeResponse {
        throw new Error("Method not implemented.");
    }
    verificateCode(code: string): HttpResponseBase {
        throw new Error("Method not implemented.");
    }
    updatePassword(password: string): HttpResponseBase {
        throw new Error("Method not implemented.");
    }
    
}