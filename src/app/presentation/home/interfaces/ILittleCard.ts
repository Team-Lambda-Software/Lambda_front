export interface ILittleCard {
    id?: string | number;
    thumbnail: string;
    title: string;
    description: string;
}

//? le puse or date porque no estan devolviendo un number
export interface IProgram extends ILittleCard {
    level?: number | string;
}

export interface ICard extends ILittleCard {
    date: string;
}
