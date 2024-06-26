import { Type } from "../../infraestructure/interfaces/type.interface"

export interface SignUpEntryDto {
  email: string
  name: string
  password: string
  phone: string
  type: Type
}
