import { Optional } from "../../../helpers/Optional";

export interface IRepository {

    saveByKeyValue(key: string, value: string):void;

    getByKey(key: string): Optional<string>;

    deleteByKey(key: string): void;

    deleteAllKeys(): void

}
