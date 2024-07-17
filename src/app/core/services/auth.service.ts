import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister, IResponse } from '../models/types';
import { map, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.API_URL + "UsersControllers";
  private router = inject(Router);

  private tokenSevice = inject(TokenService);

  constructor(private http: HttpClient) { }

  login (loginData : ILogin): Observable <IResponse>{
    return this.http.post<IResponse>(`${this.baseUrl}/login`,loginData).pipe(
      switchMap((response)=>{
        if(!response.isExitoso){
          console.log('Usuario o contraseña incorrecta');

          const respuesta: IResponse = {
            isExitoso: false,
            mensaje: 'Usuario o contraseña incorrecta'
          };
          return of(respuesta);
        }
        const token = response.token;
        if(!token) return of({isExitoso: false, mensaje : 'no token received'});
        const tokenDecoded = this.tokenSevice.decodeToken(token);
        console.log('token info', tokenDecoded);
        
       

        return this.tokenSevice.storeTokenInCookies(token).pipe(
          map(()=> response)
        );
      })
    );
  }

  register(registerData: IRegister): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.baseUrl}/register`,registerData)
  }
}
