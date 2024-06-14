import { Type } from "./interfaces/type.interface";

export interface IAppUser {
  id:    string;
  email: string;
  name:  string;
  phone: string;
  image?: string;
  type: Type
}
