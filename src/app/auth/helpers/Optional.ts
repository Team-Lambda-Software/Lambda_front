 export class Optional <T>{
    private value: T|undefined;
    private assigned:boolean;

    constructor( value :T){
        this.value=value;
        if (value) this.assigned=true
        else this.assigned=false
    }

    hasValue():boolean{
        if (this.value!==undefined) {return this.assigned=true;}
        else return this.assigned=false;
    }

    getValue():T{
        if (this.hasValue()) return <T>this.value
        else  throw new Error('Error el tipo de dato es undefiend')
    }
}
