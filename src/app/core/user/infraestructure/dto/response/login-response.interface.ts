import { User } from "../../../../../presentation/auth/interfaces/user-state.interface";

export interface LoginResponse {
  token: string;
  type:  string;
  user:  User;
}
