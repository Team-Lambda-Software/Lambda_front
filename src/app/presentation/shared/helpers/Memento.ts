interface GenericMemento <T>{
  concreteMemento(state:T):void
  getState():T

}

class GenericBackup<T> implements GenericMemento <T>{
  state: T
  concreteMemento(state: T): void {
      this.state=state
  }
  getState():T{
      return this.state
  }
  constructor(state:T) {
      this.concreteMemento(state)
  }
}

class GenericOriginator <T>{
  state :T
  save():GenericMemento <T>{
      return new GenericBackup<T>(this.state)
  }
  restore(m:GenericMemento<T>){
      this.state=m.getState()
  }
  constructor(state:T){
      this.state=state
  }
}

class Historial <T>{
  originator : GenericOriginator<T>
  history: GenericMemento<T>[]=[];
  constructor(originator:GenericOriginator<T>){
      this.originator=originator
  }
  save(originator: GenericOriginator<T>){
      this.history.push(originator.save())
  }
  allHistory(){
      this.history.forEach((history)=>{
          console.log(history);
      })
  }
  undo(){
      if (this.history){
        let memento=this.history.pop()
        this.originator.restore(memento)
      }
  }
}

class Video{
  minuto: number;
  name:string;
  constructor(minuto:number, name:string){
      this.minuto=minuto;
      this.name=name;
  }
  changeMinute(minuto:number){
      this.minuto=minuto
  }
}
//How to possible use it
// let video =new Video(0,'planeta vegetta')

// let Reproducer= new GenericOriginator<Video>(video)
// let historialVideos= new Historial<Video>(Reproducer)
// console.log('Creado el reproducer');
// console.log(historialVideos.originator.state);

// for (let i=0;i<=100;i++){
//   let newvideo =new Video(i,'planeta vegetta')
//   let Reproducer= new GenericOriginator<Video>(newvideo)
//   historialVideos.save(Reproducer)
// }
// console.log(historialVideos.history.length);
// console.log('Despues');
// console.log(historialVideos.originator.state);
// historialVideos.undo()
// console.log('Ultimo momento del video');

// console.log(historialVideos.originator.state);
