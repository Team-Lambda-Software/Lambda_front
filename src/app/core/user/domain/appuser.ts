import { IAppUser } from "./appuser.model";
import { Type } from "./interfaces/type.interface";

export class AppUser implements IAppUser{
  id: string;
  email: string;
  name: string;
  phone: string;
  image?: string | undefined;
  type:Type

  constructor(data:IAppUser){
    this.id=data.id
    this.email=data.email
    this.name=data.name
    this.phone=data.phone
    this.type=data.type
    if(data.image) this.image=data.image
    else this.image="https://via.placeholder.com/40"
  }
}
