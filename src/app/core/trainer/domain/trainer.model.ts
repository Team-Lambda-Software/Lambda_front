export interface Trainer {
  id: string
  name: string
}

export interface TrainerComplete {
   id: string
   name: string
   followers:number;
   userFollow: boolean;
   location: string
}
