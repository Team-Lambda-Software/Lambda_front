export interface IComment {
    id: string,
    userName: string,
    content: string,
    date: Date
}

export enum ETarget {
    section = 'SECTION',
    blog = 'BLOG'
}

export class CommentFeatureDto {

    constructor(
        public idTarget: string,
        public _target: ETarget,
        public _comment: string,
    ){ }

    get IdTarget(){
        return this.idTarget
    }

    get Target(){
        return this._target
    }

    get Comment(){
        return this._comment
    }
}