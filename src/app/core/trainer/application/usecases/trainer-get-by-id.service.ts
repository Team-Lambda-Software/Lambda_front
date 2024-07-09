import { Observable } from "rxjs";
import { IUseCase } from "../../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../../common/helpers/Result";
import { ITrainerGetByIdService } from "../../domain/interfaces/usecases/trainer-get-by-id.service";
import { TrainerDetail } from "../../domain/trainer.model";

export class TrainerGetByIdUseCase implements IUseCase<string,Observable<Result<TrainerDetail>>> {

  constructor(private trainerGetByIdService: ITrainerGetByIdService) { }
  
  execute(data: string): Observable<Result<TrainerDetail>> {
    const id = data; 
    return this.trainerGetByIdService.getById(id);
  }

}
