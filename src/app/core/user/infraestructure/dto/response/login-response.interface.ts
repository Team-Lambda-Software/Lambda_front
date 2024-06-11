import { User } from "./user-response.interface";

export interface LoginResponse {
  token: string;
  type:  string;
  user:  User;
}
