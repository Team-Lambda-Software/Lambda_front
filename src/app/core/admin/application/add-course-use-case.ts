import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Result } from '../../../common/helpers/Result';
import { AddCourseAdminDto } from './dto/add-course-dto';
import { enviroment } from '../../../../environments/environment';
import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';

export class AddCourseAdminUseCase  {

	readonly BASE_URL:string= enviroment.baseUrl+`/course/create`
	_httpClient = inject(HttpClient);

   	execute(params: AddCourseAdminDto): Observable<any> {

      console.log('params',params);

		let token=this.authRepository.getToken()
		if (!token.hasValue()) return of(Result.makeError<string>(new Error('Error: no tiene Token')))

		const headers= new HttpHeaders().set('Authorization',`Bearer ${token.getValue()}`)

		return this._httpClient.post<any>(this.BASE_URL, params, {headers})
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
