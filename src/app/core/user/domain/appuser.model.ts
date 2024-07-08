import { UserType } from "./enum/Usertype.interface";

export interface IAppUser {
  id:    string;
  email: string;
  name:  string;
  phone: string;
  image?: string;
  type: UserType
}
