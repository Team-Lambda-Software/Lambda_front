import { IAppUser } from "./appuser.model";
import { UserType } from "./interfaces/Usertype.interface";

export class AppUser implements IAppUser{
  id: string;
  email: string;
  name: string;
  phone: string;
  image?: string;
  type: UserType

  constructor(data:IAppUser){
    this.id=data.id
    this.email=data.email
    this.name=data.name
    this.phone=data.phone
    this.type=data.type
    if(data.image==null || data.image==undefined || data.image=='null') this.image="https://via.placeholder.com/40"
    else this.image=data.image
    console.log(this.image);

  }
}
