import { Injectable } from '@angular/core';
import { IUser, IUserProfile } from '../../../interfaces/user-info-model';

const infoHome: IUser = {
      "id":  "3345346-sdddg20",
      "name":  "Raytory Roxty",
      "image":  "https://via.placeholder.com/40",
}  

const infoProfile: IUserProfile = {
    "id":  "3345346-sdddg20",
    "name":  "Raytory Roxty",
    "image":  "https://via.placeholder.com/40",
    "followers": 1420,
    "following": 730,
}  

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor() { }

  public getUserInfo(): IUser{
    return infoHome;
  }

  public getUserInfoProfile(): IUserProfile{
    return infoProfile;
  }

}
