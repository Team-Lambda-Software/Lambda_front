import { Type } from "../type.interface"

export interface SignUpEntryDomainDTO {
  email: string
  name: string
  password: string
  phone: string
  type: Type
}
