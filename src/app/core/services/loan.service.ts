import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoan, IResponse } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

 baseUrl = environment.API_URL +"LoanControllers"
 http =inject(HttpClient);

 getLoans(): Observable<IResponse>{
  return this.http.get<IResponse>(this.baseUrl);
 }

 getLoan(id : number):Observable<ILoan>{
  return this.http.get<ILoan>(this.baseUrl +"/"+ id);
 }

 createLoan(loan : ILoan): Observable<ILoan | any>{
  return this.http.post<ILoan | any>(this.baseUrl, loan);
 }

 updateLoan(loan : ILoan){
  return this.http.put<ILoan | any>(this.baseUrl + "?id=" + loan.id, loan )
 }
}
