import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {retry,catchError} from'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = environment.api_url;
  constructor(private http:HttpClient,private router:Router) { }

  httpOptions={ 
    headers: new HttpHeaders({
      'content-type':'application/json'
    })
  }

  creatPayment(paymentDetails:any) {
    console.log(paymentDetails)
    return this.http.post(`${this.apiUrl}/payment`,paymentDetails )
    .pipe(
      catchError(this.handleError)
    )
   };
   
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }
   
      // Get server-side error
     
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    
    // alert(errorMessage);
    return throwError(errorMessage);
 }
}
