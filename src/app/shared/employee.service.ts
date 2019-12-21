import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from '../dto/employee';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseurl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  constructor(private http: HttpClient) { }

  GetEmployees(id): Observable<Employee> {

    let parameters = (id != null) ? "?id=" + id : "";
    return this.http.get<Employee>(this.baseurl + '/employees/' + parameters, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'There is a problem with the server!'
    })
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }


}
