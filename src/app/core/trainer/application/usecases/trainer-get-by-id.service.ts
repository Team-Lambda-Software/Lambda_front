import { Observable } from "rxjs";
import { IUseCase } from "../../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../../common/helpers/Result";
import { TrainerDetail } from "../../domain/trainer.model";
import { ITrainerGetByIdService } from "../../domain/interfaces/trainer-get-by-id.service";

export class TrainerGetByIdUseCase implements IUseCase<string,Observable<Result<TrainerDetail>>> {

  constructor(private trainerGetByIdService: ITrainerGetByIdService) { }
  
  execute(data: string): Observable<Result<TrainerDetail>> {
    const id = data; 
    return this.trainerGetByIdService.getById(id);
  }

}
