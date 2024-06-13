import { Optional } from "../../../../common/helpers/Optional";

export interface IAuthRepository {

    saveToken(tokenValue: string):void;
    saveEmail(email:string):void
    saveDateCode(dateCodeValue:string):void
    getToken(): Optional<string>;
    getEmail():Optional<string>;
    getDateCode():Optional<string>;
    deleteToken(): void;
    deleteEmail():void;
    deleteDateCode():void
    deleteAllKeys(): void

}
