import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../env/enviroments';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  public http = inject(HttpClient);

  constructor() {}

  getBySearch(input: string) {
    if (input === '') return;
    this.http
      .post(enviroment.baseUrl + '/search', { name: input })
      .subscribe(console.log);
  }
}
