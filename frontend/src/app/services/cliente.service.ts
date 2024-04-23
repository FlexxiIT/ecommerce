import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl= 'https://1gtvc2c2-3000.brs.devtunnels.ms'
  

  constructor(private http:HttpClient) { }

  registerClient(cliente: Client): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`,cliente);
  }
  loginCLient(emailClient:string,passwordClient:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`,{email:emailClient,password:passwordClient})
  }
  validateEmail(token:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/auth/validate-email/${token}`);
  }

}
