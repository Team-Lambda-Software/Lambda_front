import { HttpResponseBase } from "@angular/common/http"
import { Observable } from "rxjs"
import { GetCodeResponse } from "../../infraestructure/dto/response/getCode-response.interface"
import { LoginResponse } from "../../infraestructure/dto/response/login-response.interface"
import { SignUpResponse } from "../../infraestructure/dto/response/signup-response.interface"
import { User } from "../../infraestructure/dto/response/user-response.interface"
import { UserType } from "../enum/type.enum"

export interface IUserRepository {
    login(email: string, password: string): LoginResponse
    currentUser(): Observable<User>
    signUp(  
        email: string,
        name: string,
        password: string,
        phone: string,
        type: UserType
    ): Observable<SignUpResponse>
    getCodeUpdatePassword(email:string):GetCodeResponse
    verificateCode(code:string): HttpResponseBase
    updatePassword(password:string): HttpResponseBase
}

