import { Optional } from "../../shared/helpers/Optional"

export class LocalStorage{
  key:string
  value:string

  SaveLocalStorage(key:string,value:string){
    localStorage.setItem(key,value)
  }
  LoadLocalStorage(key:string):Optional<string>{
    let load =localStorage.getItem(key)
    if (load) return new Optional<string>(load)
    return new Optional<string>(undefined)
  }
  deleteLocalStorage(key:string):void{
    localStorage.removeItem(key);
  }
  constructor(key:string,value:string){
    this.key=key;
    this.value=value;
  }
}
