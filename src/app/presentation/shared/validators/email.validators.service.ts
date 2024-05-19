import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map } from 'rxjs';
import { enviroment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})

export class EmailValidatorService implements AsyncValidator {

  private http= inject(HttpClient)


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email= control.value;
    const httpCallObservable= new Observable<ValidationErrors|null>((subscriber)=>{
      if (email===''){
        subscriber.next({emailTaken:true})
        subscriber.complete()
        return
      }
      subscriber.next(null)
      subscriber.complete()
    }).pipe(
      delay(2000)
    );
    return(httpCallObservable)
  }

}
