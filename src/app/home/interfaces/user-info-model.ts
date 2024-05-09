export interface IUserInfo {
    id:string;
    name:string;
    image:string;
}

export interface IUserInfoProfile extends IUserInfo {
    followers:number;
    following:number;
}