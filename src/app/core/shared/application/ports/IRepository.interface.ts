import { Optional } from "../../../../common/helpers/Optional";

export interface IAuthRepository {

    saveToken(tokenValue: string):void;
    saveEmail(email:string):void
    saveDateCode(dateCodeValue:string):void
    saveCode(codeValue:string):void
    getToken(): Optional<string>;
    getEmail():Optional<string>;
    getDateCode():Optional<string>;
    getCode():Optional<string>;
    deleteToken(): void;
    deleteEmail():void;
    deleteDateCode():void
    deleteCode():void
    deleteAllKeys(): void

}
