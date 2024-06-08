import { Inject, Injectable } from "@angular/core";
import { BlogUseCaseService } from "../../application/blog-use-case.service";
import { HTTP_BLOG_SERVICE } from "./blog-api-provider";
import { IBlogApiService } from "../../domain/interfaces/blog-api-service.interface";
import { ProxyBlogUseCase } from "../../application/proxy-blog-use-case.service";
import { IBlogUseCase } from "../../domain/interfaces/blog-use-case.interface";

@Injectable({ providedIn: "root" })
export class BlogUsecaseProvider {
  public usecase: IBlogUseCase;

  constructor(
    @Inject(HTTP_BLOG_SERVICE) private _blogApiService: IBlogApiService
  ) {
    this.usecase =  new ProxyBlogUseCase(new BlogUseCaseService(this._blogApiService));
  }
}