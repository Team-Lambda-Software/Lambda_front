import { User } from "../user-state.interface";

export interface LoginResponse {
  token: string;
  type:  string;
  user:  User;
}
