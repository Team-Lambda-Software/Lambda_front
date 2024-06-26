import { IUseCase } from "../../../common/application/use-case.interface";
import { Result } from "../../../common/helpers/Result";
import { AppUser } from "../domain/appuser";
import { IUserRepository } from "../domain/repository/user-repository.interface";
import { SignUpEntryDto } from "./entry-dto/sign-up-entry.dto";

export class SignUpUserUseCase implements IUseCase<SignUpEntryDto, Result<AppUser>> {
    
    userConnection: IUserRepository

    constructor( userConnection: IUserRepository ) {
        this.userConnection = userConnection
    }

    execute(data: SignUpEntryDto): Result<AppUser> {
        //this.userConnection.loginUser()
        throw new Error("Method not implemented.");
    }

}