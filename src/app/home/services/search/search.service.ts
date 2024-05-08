import { Injectable, inject } from '@angular/core';
import { LocalStorage } from '../../../auth/services/LocalStorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../../../../env/enviroments';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  public http = inject(HttpClient);

  constructor() {}

  getBySearch(input: string) {
    const token = new LocalStorage('', '').LoadLocalStorage('token');
    if (!token.hasValue()) return;
    if (input === '') return;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.getValue(),
    });
    this.http
      .post(enviroment.baseUrl + '/search', { name: input }, { headers })
      .subscribe(console.log);
  }
}
