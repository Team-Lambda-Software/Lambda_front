import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Result } from '../../../common/helpers/Result';
import { AddBlogAdminDto } from './dto/add-blog-dto';
import { enviroment } from '../../../../environments/environment';
import { IAuthRepository } from '../../shared/application/ports/IAuthRepository.interface';

export class AddBlogAdminUseCase  {

	readonly BASE_URL:string= enviroment.baseUrl+`/blog/create`
	_httpClient = inject(HttpClient);

   	execute(params: AddBlogAdminDto): Observable<any> {
		const body={ data: '' }
		
		let token=this.authRepository.getToken()
		if (!token.hasValue()) return of(Result.makeError<string>(new Error('Error: no tiene Token')))

		const headers= new HttpHeaders().set('Authorization',`Bearer ${token.getValue()}`)

		return this._httpClient.put<any>(this.BASE_URL, body, {headers})
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