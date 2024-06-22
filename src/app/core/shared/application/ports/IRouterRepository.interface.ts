import { Optional } from "../../../../common/helpers/Optional"

export interface IRouterRepository {
  saveLastLink(link:string):void
  getLastLink():Optional<string>
  deleteLastLink():void
}
