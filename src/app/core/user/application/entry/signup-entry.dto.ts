import { UserType } from "../../domain/enum/Usertype.interface"

export interface SignUpEntryApplicationDTO {
  email: string
  name: string
  password: string
  phone: string
  type: UserType
}
