import { IAppUser } from "./appuser.model";
import { UserType } from "./enum/Usertype.interface";

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
    else {this.image=data.image
    const base64='data:image/png;base64,'
    const URLImage = /^(http:\/\/|https:\/\/).*\.(jpg|jpeg|png|com)$/i
    const isURLImage=URLImage.test(this.image)
    if(!isURLImage) this.image=base64.concat(this.image)}
    console.log(this.image);
  }
}
