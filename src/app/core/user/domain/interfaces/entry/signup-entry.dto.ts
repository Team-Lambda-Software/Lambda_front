import { UserType } from "../Usertype.interface"

export interface SignUpEntryDomainDTO {
  email: string
  name: string
  password: string
  phone: string
  type: UserType
}
