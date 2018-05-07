import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class UserService {
  private usersUrl = 'api/users';  // URL to web api
  private baseURL = 'http://localhost:3000/api/heros';
  private jsonURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }

  checkUser(name): Observable<any> {
    let data = {
      "where": JSON.stringify({
        "name": name
      })
    }
    return this.http.get(this.baseURL + '/count', {params: data})
      .pipe(
        
        catchError(this.handleError('getUsers', [])) 
      );
  }
  getUsers(): Observable<any> {
    return this.http.get(this.baseURL)
          .pipe( 
            tap(users => console.log(users)),
            catchError(this.handleError('getUsers', [])) 
          );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    // TODO: send the message _after_ fetching the user
    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log('fetched user id=${id}')),
        catchError(this.handleError<User>('getUser id=${id}'))
      )
  }

  updateUser (user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.usersUrl, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser (user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  searchUseres(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`api/users/?name=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUseres', []))
    );
  }
}
