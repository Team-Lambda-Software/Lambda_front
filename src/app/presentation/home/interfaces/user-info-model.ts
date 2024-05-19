export interface IUser {
    id:string;
    name:string;
    image:string;
}

export interface IUserProfile extends IUser {
    followers:number;
    following:number;
}