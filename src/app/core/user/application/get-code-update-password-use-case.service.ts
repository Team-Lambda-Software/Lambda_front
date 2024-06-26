import { IUseCase } from "../../../common/application/use-case.interface";
import { Result } from "../../../common/helpers/Result";
import { IUserRepository } from "../domain/repository/user-repository.interface";

export class getCodeUpdatePasswordUseCase implements IUseCase<string, Result<boolean>> {
    
    userConnection: IUserRepository

    constructor( userConnection: IUserRepository ) {
        this.userConnection = userConnection
    }

    execute(data: string): Result<boolean> { // email
        //this.userConnection.loginUser()
        throw new Error("Method not implemented.");
    }

}