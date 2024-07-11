import { Injectable } from "@angular/core";
import { AddBlogAdminUseCase } from "../../application/add-blog-use-case.service";
import { AddBlogApiService } from "../services/AddBlogApiService.service";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";

@Injectable({ providedIn: "root" })
export class AddBlogApiProvider {

  public usecase: AddBlogAdminUseCase;

  constructor(){
    this.usecase=new AddBlogAdminUseCase( new AddBlogApiService( new AuthLocalStorageService()))
  }
}
