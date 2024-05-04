export class SaveLocalStorage{
  key:string
  value:string

  SaveLocalStorage(key:string,value:string){
    localStorage.setItem(key,value)
  }

  constructor(key:string,value:string){
    this.key=key;
    this.value=value
  }
}
