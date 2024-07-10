import { Observable } from "rxjs";
import { IUseCase } from "../../../shared/application/ports/IUseCase.interface";
import { Result } from "../../../../common/helpers/Result";
import { TrainerDetail } from "../../domain/trainer.model";
import { ITrainerGetByIdService } from "../../domain/interfaces/trainer-get-by-id.service";
import { ITrainerGetManyService } from "../../domain/interfaces/trainer-get-many.service";

export class TrainerGetManyUseCase implements IUseCase<string,Observable<Result<TrainerDetail[]>>> {

  constructor(private trainerGetByIdService: ITrainerGetManyService) { }
  
  execute(data: string): Observable<Result<TrainerDetail[]>> {
    return this.trainerGetByIdService.getMany(data);
  }

}
