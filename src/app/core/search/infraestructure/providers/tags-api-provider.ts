import { InjectionToken } from "@angular/core";
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { SearchApiService } from "../services/search-api.service";

export const HTTP_TAGS_SERVICE = new InjectionToken<ISearchApiService>('SearchApiService');

export const TAGS_API_PROVIDER = { provide: HTTP_TAGS_SERVICE, useClass: SearchApiService };