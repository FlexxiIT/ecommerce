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

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe()
  }
  agregarCliente(cliente: Client): Observable<any> {
    return this.http.post<Client>(this.apiUrl, cliente);
  }
}
