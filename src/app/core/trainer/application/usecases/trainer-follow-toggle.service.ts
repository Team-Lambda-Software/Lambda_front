import { Observable } from "rxjs";
import { IUseCase } from "../../../shared/application/ports/IUseCase.interface";
import { ITrainerFollowToggleService } from "../../domain/interfaces/trainer-follow-toggle.service";

export class TrainerFollowToggleUseCase implements IUseCase<string,Observable<void>> {

  constructor(private trainerFollowToggleService: ITrainerFollowToggleService) { }
  
  execute(data: string): Observable<void> {
    const id = data; 
    return this.trainerFollowToggleService.toggle(id);
  }

}
