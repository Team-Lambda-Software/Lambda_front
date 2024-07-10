import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddCourseAdminDto } from '../../application/interfaces/dto/add-course-dto';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Result } from '../../../../common/helpers/Result';
import { IAuthRepository } from '../../../shared/application/ports/IAuthRepository.interface';
import { IAdminAddCourse } from '../../application/interfaces/admin-add-course.interface';

export class AddCourseApiService implements IAdminAddCourse {

  readonly BASE_URL:string= enviroment.baseUrl+`/course/create`
	_httpClient = inject(HttpClient);

   	execute(params: AddCourseAdminDto): Observable<Result<number>> {

      console.log('params',params);

		let token=this.authRepository.getToken()
		if (!token.hasValue()) return of(Result.makeError<number>(new Error('Error: no tiene Token')))

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
