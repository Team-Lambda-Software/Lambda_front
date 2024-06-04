import { InjectionToken } from "@angular/core";
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { SearchApiService } from "../services/search-api.service";

export const HTTP_SEARCH_SERVICE = new InjectionToken<ISearchApiService>('SearchApiService');

export const SEARCH_API_PROVIDER = { provide: HTTP_SEARCH_SERVICE, useClass: SearchApiService };