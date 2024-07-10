export interface Trainer {
  id: string,
  name: string,
  followers: number,
  location: string
}

export interface TrainerDetail extends Trainer {
  userFollow: boolean
}


export interface TrainerComplete {
   id: string
   name: string
   followers:number;
   userFollow: boolean;
   location: string
}
