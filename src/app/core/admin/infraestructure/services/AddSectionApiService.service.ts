import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { AddSectionAdminDto } from '../../application/interfaces/dto/add-section-dto';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Result } from '../../../../common/helpers/Result';
import { IAuthRepository } from '../../../shared/application/ports/IAuthRepository.interface';
import { IAddminAddSection } from '../../application/interfaces/admin-add-section.interface';


export class AddSectionApiService implements IAddminAddSection {
  readonly BASE_URL:string= enviroment.baseUrl+`/course/add-section/`
	_httpClient = inject(HttpClient);

   	execute(params: AddSectionAdminDto): Observable<Result<number>> {
    const url=this.BASE_URL+`${params.id_course}`
		const body = {
			name: params.name,
			description: params.description,
			duration: params.duration,
			video: params.video
		}
    console.log(body);


		let token=this.authRepository.getToken()
		if (!token.hasValue()) return of(Result.makeError<number>(new Error('Error: no tiene Token')))

		const headers= new HttpHeaders().set('Authorization',`Bearer ${token.getValue()}`)

		return this._httpClient.post<HttpResponseBase>(this.BASE_URL+params.id_course, body, {headers})
		  .pipe(
			map((response)=>{
			  return Result.makeResult(response.status)
			}),
			catchError(error=>{
			  return throwError( ()=> Result.makeError(new Error(error.error.message)))
			})
		  )
	}

	constructor(private authRepository:IAuthRepository) {}

}
