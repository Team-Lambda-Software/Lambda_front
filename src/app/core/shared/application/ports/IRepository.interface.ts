import { Optional } from "../../../../common/helpers/Optional";

export interface IAuthRepository {

    saveToken(tokenValue: string):void;

    getToken(): Optional<string>;

    deleteToken(): void;

    deleteAllKeys(): void

}
