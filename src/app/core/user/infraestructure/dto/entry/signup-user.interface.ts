import { Type } from "../response/type.interface"

export interface SignUpUser {
  email: string
  name: string
  password: string
  phone: string
  type: Type
}
