import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBook, IResponse } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl= environment.API_URL+ "BooksContollers";
  http= inject(HttpClient);

  private bookCreated= new BehaviorSubject<IBook | null>(null);
 

  getBooks(): Observable<IResponse>{
    return this.http.get<IResponse>(this.apiUrl);
  }

  getBook(id: number): Observable<IResponse>{
    return this.http.get<IResponse>(this.apiUrl+"/"+id);
  }

  createBook(book : IBook): Observable<IBook | any> {
    return this.http.post<IBook | any> (this.apiUrl, book);
  }

  updateBook(book : IBook){
    return this.http.put<IBook | any>(this.apiUrl + "?id=" + book.id, book);
  }

  deleteBook(id: number){
    return this.http.delete (this.apiUrl +"/"+id);
  }

  getBookName(name : string){
    return this.http.get (this.apiUrl + name);
  }

  setBookCreated(book :IBook): void{
    this.bookCreated.next(book);
  }

  getBookCreated():IBook | null{
    return this.bookCreated.value;
  } 

}
