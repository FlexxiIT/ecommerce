import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl= 'http://localhost:3000/posts'

  constructor(private http:HttpClient) { }

  getClientes(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}`);
  }
  agregarCliente(cliente: Client): Observable<any> {
    return this.http.post<Client>(this.apiUrl, cliente);
  }
  autenticarUsuario(email: string, password: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }
}
