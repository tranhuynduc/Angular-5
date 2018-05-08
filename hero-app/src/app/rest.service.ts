import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RestService {
  private baseURL = 'http://localhost:3000/api/';
  private articleUrl = 'http://localhost:3000/api/articles';
  
  constructor(
    private http: HttpClient
  ) { }


  getData(url = '', options?): Observable<any> {
    console.log('getData', url, options);
    return this.http.get(this.baseURL + url, options)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError('getUsers', []))         
      );
  }

  addData(url = '',data): Observable<any> {
    console.log('addData', url, data);
    return this.http.post(this.baseURL + url, data, this.getHeaderOptions())
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError('getUsers', []))         
      );
  }

  deleteData(url = ''): Observable<any> {
    return this.http.delete(this.baseURL + url, this.getHeaderOptions())
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError('getUsers', []))         
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      return of(result as T);
    };
  }

  getHeaderOptions(type = 'application/json') {
    return {
      headers: new HttpHeaders ({
        'Content-Type': type
      })
    }
  }
}
