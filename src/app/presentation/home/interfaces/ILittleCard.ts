export interface ILittleCard {
    id: string | number;
    thumbnail: string;
    title: string;
    description: string;
}

export interface IProgram extends ILittleCard {
    level: number;
}

export interface ICard extends ILittleCard {
    date: string;
}
