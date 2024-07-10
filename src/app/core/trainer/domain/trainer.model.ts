export interface Trainer {
  id: string,
  name: string,
  followers: number,
  location: string
}

export interface TrainerDetail extends Trainer {
  userFollow: boolean
}

