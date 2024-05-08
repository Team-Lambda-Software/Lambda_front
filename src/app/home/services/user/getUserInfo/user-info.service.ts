import { Injectable } from '@angular/core';
import { IUserInfo, IUserInfoProfile } from '../../../interfaces/user-info-model';

const infoHome: IUserInfo = {
      "id":  "3345346-sdddg20",
      "name":  "Raytory Roxty",
      "image":  "https://via.placeholder.com/40",
}  

const infoProfile: IUserInfoProfile = {
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

  public getUserInfo(): IUserInfo{
    return infoHome;
  }

  public getUserInfoProfile(): IUserInfoProfile{
    return infoProfile;
  }

}
