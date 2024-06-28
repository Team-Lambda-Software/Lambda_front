export interface IUseCase <T,E>{
  execute (data:T):E
}
