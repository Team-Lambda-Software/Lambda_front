import { IUseCase } from "../../../common/application/use-case.interface";
import { Result } from "../../../common/helpers/Result";
import { IUserRepository } from "../domain/repository/user-repository.interface";

export class VerificateCodeUseCase implements IUseCase<any, Result<boolean>> {
    
    userConnection: IUserRepository

    constructor( userConnection: IUserRepository ) {
        this.userConnection = userConnection
    }

    execute(data: string): Result<boolean> { // code
        //this.userConnection.loginUser()
        throw new Error("Method not implemented.");
    }

}