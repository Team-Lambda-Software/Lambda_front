import { IUseCase } from "../../../common/application/use-case.interface";
import { Result } from "../../../common/helpers/Result";
import { AppUser } from "../domain/appuser";
import { IUserRepository } from "../domain/repository/user-repository.interface";
import { LogInEntryDto } from "./entry-dto/log-in-entry.dto";

export class LoginUserUseCase implements IUseCase<LogInEntryDto, Result<AppUser>> {
    
    userConnection: IUserRepository

    constructor( userConnection: IUserRepository ) {
        this.userConnection = userConnection
    }

    execute(data: LogInEntryDto): Result<AppUser> {
        //this.userConnection.loginUser()
        throw new Error("Method not implemented.");
    }

}