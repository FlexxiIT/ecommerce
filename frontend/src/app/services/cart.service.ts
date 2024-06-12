import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token: string = '';
  private url: string= '';

  constructor(private http: HttpClient) {
    const isToken = localStorage.getItem('token');
    if(isToken !== null){
      this.token = isToken;
    }
  }

  getHeaders(){
    const tokenAsString = String(this.token); // Convertir a string si es necesario

    const headers = new HttpHeaders({
      'authorization': tokenAsString  // Asegurarse de que el token sea de tipo string
    })

    const requestOptions = {
      headers: headers
    };

    return requestOptions;
  }
}
