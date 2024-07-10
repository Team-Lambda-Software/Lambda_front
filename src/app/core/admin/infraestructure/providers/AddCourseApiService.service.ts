import { Injectable } from "@angular/core";
import { AddCourseAdminUseCase } from "../../application/add-course-use-case.service";
import { AddCourseApiService } from "../services/AddCourseApiService.service";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";


@Injectable({ providedIn: "root" })

export class AddCourseApiProvider {

  public usecase: AddCourseAdminUseCase;

  constructor(){
    this.usecase=new AddCourseAdminUseCase(new AddCourseApiService(new AuthLocalStorageService))

  }
}
