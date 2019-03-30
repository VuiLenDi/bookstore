import { Injectable } from '@angular/core';
import { Book } from '../shared/models/book';
import { Observable, of } from 'rxjs';

import { MessageService } from '../core/messages/message.service';
import { BaseService } from '../shared/services/base.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = '/api/books';

  getBooks(): Observable<Book[]> {

    const listBookUrl = this.baseService.baseUrl + this.booksUrl + '/list';

    return this.http.get<Book[]>(listBookUrl)
      .pipe(
        tap(() => this.log('fetched books')),
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  addBook(book: Book): Observable<Book> {
    const addBookUrl = this.baseService.baseUrl + this.booksUrl + '/addBook';

    return this.http.post<Book>(addBookUrl, book, httpOptions).pipe(
      tap((newBook: Book) => this.log(`added book w/ id=${newBook.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private baseService: BaseService) {
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }
}
