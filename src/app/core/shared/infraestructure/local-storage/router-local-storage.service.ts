import { Optional } from "../../../../common/helpers/Optional";
import { IRouterRepository } from "../../application/ports/IRouterRepository.interface";

export class routerLocalStorageRepository implements IRouterRepository {
  private lastLinkKey='lastPath'

  saveLastLink(link: string): void {
    localStorage.setItem(this.lastLinkKey, link);
  }

  getLastLink(): Optional<string> {
    let item = localStorage.getItem(this.lastLinkKey)
    if (item) return new Optional<string>(item)
    return new Optional<string>(undefined)  }

  deleteLastLink(): void {
    localStorage.removeItem(this.lastLinkKey);
  }
}
