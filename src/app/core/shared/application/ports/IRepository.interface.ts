import { Optional } from "../../../../common/helpers/Optional";

export interface IAuthRepository {

    saveToken(tokenValue: string):void;
    saveEmail(email:string):void
    getToken(): Optional<string>;
    getEmail():Optional<string>;
    deleteToken(): void;
    deleteEmail():void;
    deleteAllKeys(): void

}
