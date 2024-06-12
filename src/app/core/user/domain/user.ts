import { IUser } from "./user.model";

export class User implements IUser{
  id: string;
  email: string;
  name: string;
  phone: string;
  image?: string | undefined;

  constructor(data:IUser){
    this.id=data.id
    this.email=data.email
    this.name=data.name
    this.phone=data.name
    if(data.image) this.image=data.image
    else this.image="https://via.placeholder.com/40"
  }
}
