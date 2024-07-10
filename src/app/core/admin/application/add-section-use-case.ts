import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Result } from '../../../common/helpers/Result';
import { AddSectionAdminDto } from './dto/add-section-dto';
import { enviroment } from '../../../../environments/environment';
import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';

export class AddSectionAdminUseCase  {

	readonly BASE_URL:string= enviroment.baseUrl+`/course/add-section/`
	_httpClient = inject(HttpClient);

   	execute(params: AddSectionAdminDto): Observable<any> {
		const body = {
			name: params.name,
			description: params.description,
			duration: params.duration,
			file: params.file
		}

		let token=this.authRepository.getToken()
		if (!token.hasValue()) return of(Result.makeError<string>(new Error('Error: no tiene Token')))

		const headers= new HttpHeaders().set('Authorization',`Bearer ${token.getValue()}`)

		return this._httpClient.post<any>(this.BASE_URL+params.id_course, body, {headers})
		  .pipe(
			map((response)=>{
			  return Result.makeResult(response.id)
			}),
			catchError(error=>{
			  return throwError( ()=> Result.makeError(new Error(error.error.message)))
			})
		  )
	}

	constructor(private authRepository:IAuthRepository) {}
}
