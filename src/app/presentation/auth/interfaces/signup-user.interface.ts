import { Type } from "../../../core/user/infraestructure/dto/response/type.interface"

export interface SignUpUser {
  email: string
  name: string
  password: string
  phone: string
  type: Type
}
