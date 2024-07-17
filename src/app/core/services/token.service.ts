import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode'; 
import { CookieService } from 'ngx-cookie-service';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  decodeToken(token : string): any {
    try{
      return jwt.jwtDecode(token)
    }catch (error){
      console.error("error decoding token", error);
      return null;
    }
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  storeTokenInCookies(token : string): Observable<void>{
    return new Observable<void>((observe)=>{
      this.cookieService.set('token', token,{
        expires: this.getTokenExpiration(token),
        sameSite: 'Strict',
        secure: true
      });
      
      observe.next();
      observe.complete();
    });
  }

  deleteTokenFromCookies():void{
    this.cookieService.delete('token')
  }

  isTokenExpired(token?: string): boolean{
    if(!token) token= this.getToken();
    if(!token) return true;

    try{
      const decode: any = jwt.jwtDecode(token);
      if (decode.exp === undefined) return false
      
      const date = new Date(0);
      date.setUTCSeconds(decode.exp);
      return date.valueOf() < new Date().valueOf();
    } catch(error){
      console.error('error verifing token', error)
      return true;
    }
  }

  private getTokenExpiration (token: string): Date {
    const decoded : any = jwt.jwtDecode(token);
    if(decoded.exp === undefined) {return new Date();}

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp)
    return date;
  }
}
