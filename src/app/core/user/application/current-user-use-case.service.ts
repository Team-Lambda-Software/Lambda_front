import { IUseCase } from "../../../common/application/use-case.interface";
import { Result } from "../../../common/helpers/Result";
import { IUserRepository } from "../domain/repository/user-repository.interface";

export class CurrentUserUseCase implements IUseCase<any, Result<boolean>> {
    
    userConnection: IUserRepository

    constructor( userConnection: IUserRepository ) {
        this.userConnection = userConnection
    }

    execute(data: any): Result<boolean> {
        //this.userConnection.loginUser()
        throw new Error("Method not implemented.");
    }

}